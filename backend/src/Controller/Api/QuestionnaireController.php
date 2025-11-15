<?php

namespace App\Controller\Api;

use App\Entity\Reponse;
use App\Entity\Resultat;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api/questionnaire', name: 'api_questionnaire_')]
class QuestionnaireController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    #[Route('/submit', name: 'submit', methods: ['POST'])]
    public function submit(Request $request, #[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Authentication required'], 401);
        }

        $data = json_decode($request->getContent(), true);
        $reponseIds = $data['reponses'] ?? [];

        if (empty($reponseIds)) {
            return $this->json(['error' => 'No response provided'], 400);
        }

        // Récupere tous les objets Reponse en une seule requête
        $reponses = $this->em->getRepository(Reponse::class)->findBy(['id' => $reponseIds]);

        // calcul score total
        $scoreFinal = 0;
        foreach ($reponses as $reponse) {
            $scoreFinal += $reponse->getValeur();
        }

        // MAJ du score global de l'utilisateur
        $user->setScore($scoreFinal);

        // Un seul objet Resultat pour le submit
        $resultat = new Resultat();
        $resultat->setUser($user);
        $resultat->setScore($scoreFinal);
        $resultat->setDate(new \DateTimeImmutable());
        $resultat->setDetails(['reponse_ids' => $reponseIds]);

        $this->em->persist($resultat);
        $this->em->flush();

        return $this->json([
            'message' => 'Submit success',
            'scoreObtenu' => $scoreFinal,
            'resultatId' => $resultat->getId()
        ], 201);
    }
}
