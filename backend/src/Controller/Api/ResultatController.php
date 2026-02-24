<?php

namespace App\Controller\Api;

use App\Entity\Resultat;
use App\Entity\User;
use App\Entity\Question;
use App\Repository\ResultatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Bundle\SecurityBundle\Security;

#[Route('/api/resultat', name: 'api_resultat_')]
final class ResultatController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    // Récpère les bons résultats: priority 10 pour Symfony ne confonde pas "me" et un id"
    #[Route('/me', name: 'me', methods: ['GET'], priority: 10)]
    public function getMyResults(Security $security, ResultatRepository $resultatRepository): JsonResponse
    {
        $user = $security->getUser();

        if (!$user) {
            return $this->json(['error' => 'Authentication required'], 401);
        }

        $resultats = $resultatRepository->findBy(
            ['user' => $user],
            ['date' => 'DESC'] 
        );

        return $this->json($resultats, 200, [], ['groups' => 'resultat:read']);
    }

    // GET /api/resultat -> liste tous les résultats
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $resultats = $this->em->getRepository(Resultat::class)->findAll();
        return $this->json($resultats, 200, [], ['groups' => 'resultat:read']);
    }

    // GET /api/resultat/{id} -> un résultat précis
    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(Resultat $resultat): JsonResponse
    {
        return $this->json($resultat, 200, [], ['groups' => 'resultat:read']);

    }

    // POST /api/resultat -> créer un résultat
   #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, #[CurrentUser] ?User $user): JsonResponse
    {
    if (!$user) {
        return $this->json(['error' => 'Authentication required'], 401);
    }

    $data = json_decode($request->getContent(), true);

    $resultat = new Resultat();
    $resultat->setScore($data['score'] ?? 0);
    $resultat->setUser($user);
    $resultat->setDate(new \DateTimeImmutable());
    
    // Question option.
    if (isset($data['question_id'])) {
        $question = $this->em->getRepository(Question::class)->find($data['question_id']);
        if ($question) {
            $resultat->setQuestion($question);
        }
    }
    
    if (isset($data['details'])) {
        $resultat->setDetails($data['details']);
    }
    
    $this->em->persist($resultat);
    $this->em->flush();

    return $this->json([
        'message' => 'Resultat created',
        'id' => $resultat->getId(),
    ], 201);
}

    // PUT /api/resultat/{id} -> MAJ un résultat
    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Resultat $resultat, #[CurrentUser] ?User $user): JsonResponse
    {
        //Securité
        if (!$user) {
            return $this->json(['error' => 'Authentication required'], 401);
        }
        if ($resultat->getUser() !== $user) {
            return $this->json(['error' => 'Unauthorized access'], 403); 
        }
        $data = json_decode($request->getContent(), true);


        if (isset($data['score'])) {
            $resultat->setScore($data['score']);
        }
        
        if (isset($data['details'])) {
            $resultat->setDetails($data['details']);
        }

        $this->em->flush();

        return $this->json([
            'message' => 'Resultat updated',
            'id' => $resultat->getId(),
        ]);
    }

    // DELETE /api/resultat/{id} -> supprimer un résultat
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Resultat $resultat, #[CurrentUser] ?User $user): JsonResponse
    {
            if(!$user){
                return $this->json(['error' => 'Authentication required'], 401);
            }
            if ($resultat->getUser() !== $user) {
                return $this->json(['error' => 'Unauthorized access'], 403);
            }
        $this->em->remove($resultat);
        $this->em->flush();

        return $this->json([
            'message' => 'Resultat deleted',
            'id' => $resultat->getId(),
        ]);
    }
}
