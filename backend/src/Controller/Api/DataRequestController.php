<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[Route('/api', name: 'api_')]
class DataRequestController extends AbstractController
{
    #[Route('/data-request', name: 'data_request', methods: ['POST'])]
    public function dataRequest(
        Request $request,
        MailerInterface $mailer
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (empty($data['email']) || empty($data['type'])) {
            return new JsonResponse(
                ['error' => 'Email et type de demande requis'],
                Response::HTTP_BAD_REQUEST
            );
        }

    $type = $data['type'] ?? '';
    $emailSafe = htmlspecialchars($data['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($data['message'] ?? 'Aucun message complémentaire.', ENT_QUOTES, 'UTF-8');

if (!in_array($type, ['access', 'deletion'])) {
    return new JsonResponse(
        ['error' => 'Type de demande invalide'],
        Response::HTTP_BAD_REQUEST
    );
}

$typeLabel = $type === 'deletion' ? 'Suppression de compte' : 'Accès aux données';

        $email = (new Email())
            ->from('noreply@consonum.fr')
            ->to('admin@consonum.fr')
            ->subject('Demande RGPD : ' . $type)
            ->html(
                '<p><strong>Type de demande :</strong> ' . $typeLabel . '</p>' .
                '<p><strong>Email demandeur :</strong> ' . $emailSafe . '</p>' .
                '<p><strong>Message :</strong> ' . $message . '</p>'
            );

        $mailer->send($email);

        return new JsonResponse(
            ['message' => 'Demande envoyée avec succès'],
            Response::HTTP_OK
        );
    }
}
