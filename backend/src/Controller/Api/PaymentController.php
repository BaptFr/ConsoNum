<?php

namespace App\Controller\Api;

use App\Service\PaymentService;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/payment')]
class PaymentController extends AbstractController
{
    public function __construct(
        private PaymentService $paymentService,
        private UserRepository $userRepository,
        private EntityManagerInterface $entityManager,
        private string $stripeWebhookSecret
    ) {}

    #[Route('/intent', name: 'payment_intent', methods: ['POST'])]
    #[IsGranted('ROLE_USER')]
    public function createIntent(): JsonResponse
    {
        $user = $this->getUser();

        if ($user->isHasPaid()) {
            return $this->json(['message' => 'Accès déjà débloqué.'], Response::HTTP_OK);
        }

        $paymentIntent = $this->paymentService->createPaymentIntent(199, $user->getId());

        return $this->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }

    #[Route('/webhook', name: 'payment_webhook', methods: ['POST'])]
    public function webhook(Request $request): Response
    {
        $payload = $request->getContent();
        $sigHeader = $request->headers->get('Stripe-Signature');

        try {
            $event = $this->paymentService->constructEvent(
                $payload,
                $sigHeader,
                $this->stripeWebhookSecret
            );
        } catch (\Exception $e) {
            return new Response('Signature invalide', Response::HTTP_BAD_REQUEST);
        }

        if ($event->type === 'payment_intent.succeeded') {
            $paymentIntent = $event->data->object;
            $metadata = $paymentIntent->metadata;

            if (isset($metadata['user_id'])) {
                $user = $this->userRepository->find($metadata['user_id']);
                if ($user) {
                    $user->setHasPaid(true);
                    $this->entityManager->flush();
                }
            }
        }

        return new Response('OK', Response::HTTP_OK);
    }
}
