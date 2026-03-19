<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[Route('/api/users', name: 'api_users_')]
class UserController extends AbstractController
{
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(
                ['error' => 'Email et mot de passe requis'],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (strlen($data['password']) < 6) {
            return new JsonResponse(
                ['error' => 'Le mot de passe doit contenir au moins 6 caractères'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = new User();
        $user->setEmail($data['email'] ?? '');
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                // error for frontend
                $errorMessages[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage(),
                ];
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        //  password Hash
        $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        $user->setIsVerified(false);
        $user->setVerificationToken(bin2hex(random_bytes(32)));

        try {
                $em->persist($user);
                $em->flush();
        } catch (UniqueConstraintViolationException $e) {
            return $this->json([
                'error' => 'Email already exists'
            ], Response::HTTP_CONFLICT);
        }
        
        $verificationUrl = $_ENV['FRONTEND_URL'] . '/verify?token=' . $user->getVerificationToken();

        $email = (new Email())
            ->from('noreply@consonum.fr')
            ->to($user->getEmail())
            ->subject('Confirmez votre adresse email - ConsoNum')
            ->html('<p>Bonjour,</p><p>Cliquez sur ce lien pour confirmer votre inscription :</p><p><a href="' . $verificationUrl . '">' . $verificationUrl . '</a></p>');
            
        $mailer->send($email);

        return new JsonResponse([
            'status' => 'User created',
            'user' => [
                'id' => $user->getId(),
                'message' => 'Un email de confirmation a été envoyé.'
            ]
        ], Response::HTTP_CREATED);
    }

    //Creation verification 
    #[Route('/verify/{token}', name: 'verify', methods: ['GET'])]
    public function verify(
        string $token,
        EntityManagerInterface $em
    ): JsonResponse {
        $user = $em->getRepository(User::class)->findOneBy(['verificationToken' => $token]);

        if (!$user) {
            return new JsonResponse(
                ['error' => 'Token invalide ou expiré'],
                Response::HTTP_NOT_FOUND
            );
        }

        if ($user->isVerified()) {
            return new JsonResponse(
                ['message' => 'Compte déjà vérifié'],
                Response::HTTP_OK
            );
        }

        $user->setIsVerified(true);
        $user->setVerificationToken(null);
        $em->flush();

        return new JsonResponse(
            ['message' => 'Compte vérifié avec succès'],
            Response::HTTP_OK
        );
    }


    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_UNAUTHORIZED);
        }

        $userData = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
            'score' => $user->getScore(),
            // fdate format for JSON
            'createdAt' => $user->getCreatedAt() ? $user->getCreatedAt()->format('Y-m-d H:i:s') : null,
        ];

        return $this->json($userData);
    }
}
