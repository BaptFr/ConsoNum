<?php

namespace App\Controller\Api;

use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/question', name: 'api_question_')]
final class QuestionController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    // GET /api/question - liste des questions
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $questions = $this->em->getRepository(Question::class)->findAll();
    
        return $this->json(
            $questions, 
            200,         
            [],          
            ['groups' => 'question:read']
        );
    }

    // GET /api/question/{id} - une question précise
    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(Question $question): JsonResponse
    {
        return $this->json($question, 200, [], ['groups' => 'question:read']);
    }

    // POST /api/question - Céer une question
    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        // ajout couche role
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        $question = new Question();
        $question->setTexte($data['intitule'] ?? 'Nouvelle question');


        $question->setTexte($data['texte'] ?? 'Nouvelle question');
        $question->setType($data['type'] ?? 'simple'); 

        $now = new \DateTimeImmutable();
        $question->setCreatedAt($now);
        $question->setUpdatedAt($now);
        
        $this->em->persist($question);
        $this->em->flush();

        return $this->json([
            'message' => 'Question created',
            'id' => $question->getId(),
        ], 201);
    }

    // PUT /api/question/{id} - màj une question
    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Question $question): JsonResponse
    {
        //couche role
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $data = json_decode($request->getContent(), true);

        if (isset($data['intitule'])) {
            $question->setTexte($data['intitule']);
        }

        $this->em->flush();

        return $this->json([
            'message' => 'Question updated',
            'id' => $question->getId(),
        ]);
    }

    // DELETE /api/question/{id} - supprimer  question
    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Question $question): JsonResponse
    {
        // couche rôle
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $this->em->remove($question);
        $this->em->flush();

        return $this->json([
            'message' => 'Question deleted',
            'id' => $question->getId(),
        ]);
    }
}
