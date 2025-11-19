<?php

namespace App\Controller\Api;

use App\Entity\Question;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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
    public function create(Request $request, ValidatorInterface $validator): JsonResponse
    {
        // ajout couche role
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $data = json_decode($request->getContent(), true);

        $question = new Question();
        
          $valeurTexte = $data['texte'] ?? $data['intitule'] ?? null;
        $question->setTexte($valeurTexte); // Attention : si null, il faut que ton setter accepte null ou gérer l'erreur avant

        // Si ton setter setTexte n'accepte pas null, mets une string vide '' pour déclencher l'erreur Assert\NotBlank
        if ($valeurTexte === null) {
             $question->setTexte('');
        }

        $question->setType($data['type'] ?? 'simple'); 

        $now = new \DateTimeImmutable();
        $question->setCreatedAt($now);
        $question->setUpdatedAt($now);

        $errors = $validator->validate($question);

        if (count($errors) > 0) {
            return $this->json($errors, 400);
        }
        
        $this->em->persist($question);
        $this->em->flush();

        return $this->json([
            'message' => 'Question created',
            'id' => $question->getId(),
        ], 201);
    }

    // PUT /api/question/{id} - màj une question
    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Question $question, ValidatorInterface $validator): JsonResponse
    {
        //couche role
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $data = json_decode($request->getContent(), true);

        if (isset($data['intitule'])) {
            $question->setTexte($data['intitule']);
        }
        if (isset($data['texte'])) {
            $question->setTexte($data['texte']);
        }
        
        $errors = $validator->validate($question);
        if (count($errors) > 0) {
            return $this->json($errors, 400);
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
