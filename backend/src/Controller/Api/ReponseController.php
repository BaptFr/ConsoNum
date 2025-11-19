<?php

namespace App\Controller\Api;

use App\Entity\Question;
use App\Entity\Reponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/reponse', name: 'api_reponse_')]
final class ReponseController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $data = json_decode($request->getContent(), true);

        // Récupère la question
        $questionId = $data['question_id'] ?? null;
        if (!$questionId) {
            return $this->json(['error' => 'L\'ID de la question est manquant'], 400);
        }

        $question = $this->em->getRepository(Question::class)->find($data['question_id']);
        if (!$question) {
            return $this->json(['error' => 'Question non trouvée'], 404);
        }

        $reponse = new Reponse();
        $reponse->setTexte($data['texte']);

        // Verif data
        $valeur = isset($data['valeur']) ? (float)$data['valeur'] : null;
        $reponse->setValeur($valeur);
        $reponse->setQuestion($question); // reponse liée avec question

        $errors = $validator->validate($reponse);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }

        $this->em->persist($reponse);
        $this->em->flush();

        return $this->json([
            'message' => 'Reponse created',
            'id' => $reponse->getId(),
        ], 201);
    }
}