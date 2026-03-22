<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\User;
use App\Entity\Question;
use App\Entity\Reponse;

class QuestionnaireControllerTest extends WebTestCase
{
    private $client;
    private $token;
    private $user;
    private $reponse;

    protected function setUp(): void
    {
        $this->client = static::createClient();

        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $email = 'test_questionnaire_' . uniqid() . '@example.com';

        $this->user = new User();
        $this->user->setEmail($email);
        $this->user->setPassword($passwordHasher->hashPassword($this->user, 'Password123!'));
        $this->user->setScore(0);
        $this->user->setCreatedAt(new \DateTime());
        $this->user->setIsVerified(true);
        $this->user->setVerificationToken(null);

        $em->persist($this->user);

        $now = new \DateTimeImmutable();

        $question = new Question();
        $question->setTexte('Question de test pour le questionnaire ?');
        $question->setType('simple');
        $question->setCreatedAt($now);
        $question->setUpdatedAt($now);

        $em->persist($question);

        $this->reponse = new Reponse();
        $this->reponse->setTexte('Réponse de test');
        $this->reponse->setValeur(5.0);
        $this->reponse->setQuestion($question);
        $this->reponse->setCreatedAt($now);
        $this->reponse->setUpdatedAt($now);

        $em->persist($this->reponse);
        $em->flush();

        $this->client->request('POST', '/api/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!'
        ]));

        $loginData = json_decode($this->client->getResponse()->getContent(), true);
        $this->token = $loginData['token'];
    }

    public function testSubmitSuccess(): void
    {
        $this->client->request('POST', '/api/questionnaire/submit', [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ], json_encode([
            'reponses' => [$this->reponse->getId()]
        ]));

        $this->assertResponseStatusCodeSame(201);

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('message', $responseData);
        $this->assertArrayHasKey('scoreObtenu', $responseData);
        $this->assertArrayHasKey('resultatId', $responseData);
        $this->assertEquals('Submit success', $responseData['message']);
        $this->assertEquals(5.0, $responseData['scoreObtenu']);
    }

    public function testSubmitWithoutAuth(): void
    {
        $this->client->request('POST', '/api/questionnaire/submit', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'reponses' => [$this->reponse->getId()]
        ]));

        $this->assertResponseStatusCodeSame(401);
    }

    public function testSubmitWithoutReponses(): void
    {
        $this->client->request('POST', '/api/questionnaire/submit', [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ], json_encode([
            'reponses' => []
        ]));

        $this->assertResponseStatusCodeSame(400);
    }
}
