<?php

namespace App\Controller\Api;

use App\Entity\Question;
use App\Entity\Reponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/reponse', name: 'api_reponse_')]
final class ReponseController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Verif data
        if (empty($data['texte']) || !isset($data['valeur']) || empty($data['question_id'])) {
            return $this->json(['error' => 'Les champs texte, valeur et question_id sont requis'], 400);
        }

        // Récupère la question
        $question = $this->em->getRepository(Question::class)->find($data['question_id']);
        if (!$question) {
            return $this->json(['error' => 'Question non trouvée'], 404);
        }

        $reponse = new Reponse();
        $reponse->setTexte($data['texte']);
        $reponse->setValeur((float)$data['valeur']); // La valeur est un float
        $reponse->setQuestion($question); // reponse liée avec question

        $now = new \DateTimeImmutable();
        $reponse->setCreatedAt($now);
        $reponse->setUpdatedAt($now);

        $this->em->persist($reponse);
        $this->em->flush();

        return $this->json([
            'message' => 'Reponse created',
            'id' => $reponse->getId(),
        ], 201);
    }
}