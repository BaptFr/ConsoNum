<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\User;
use App\Entity\Resultat;

class ResultatControllerTest extends WebTestCase
{
    private $client;
    private $token;
    private $user;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        
        //User creation + JWT
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $email = 'test_resultat_' . time() . '@example.com';
        
        $this->user = new User();
        $this->user->setEmail($email);
        $this->user->setPassword($passwordHasher->hashPassword($this->user, 'Password123!'));
        $this->user->setScore(0);
        $this->user->setCreatedAt(new \DateTime());
        $this->user->setIsVerified(true);

        
        $em->persist($this->user);
        $em->flush();

        //Get JWT
        $this->client->request('POST', '/api/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!'
        ]));

        $loginData = json_decode($this->client->getResponse()->getContent(), true);
        $this->token = $loginData['token'];
    }

    private function createResultat(int $score = 42): Resultat
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();

        $resultat = new Resultat();
        $resultat->setScore($score);
        $resultat->setUser($this->user);
        $resultat->setDate(new \DateTimeImmutable());
        $resultat->setDetails(['category' => 'test']);

        $em->persist($resultat);
        $em->flush();

        return $resultat;
    }

    public function testCreateResultatSuccess(): void
    {
        $this->client->request('POST', '/api/resultat', [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ], json_encode([
            'score' => 42,
            'details' => ['category' => 'test', 'notes' => 'Test resultat details']       
        ]));

        $this->assertResponseStatusCodeSame(201);
        
        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('message', $responseData);
        $this->assertArrayHasKey('id', $responseData);
        $this->assertEquals('Resultat created', $responseData['message']);
    }

    public function testCreateResultatWithoutAuth(): void
    {
        $this->client->request('POST', '/api/resultat', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'score' => 42,
        ]));

        $this->assertResponseStatusCodeSame(401);
    }

    public function testGetMyResultats(): void
    {
        $this->createResultat(50);

        $this->client->request('GET', '/api/resultat/me', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ]);

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertIsArray($responseData);
        $this->assertNotEmpty($responseData);
        $this->assertEquals(50, $responseData[0]['score']);
    }

    public function testGetMyResultatsWithoutAuth(): void
    {
        $this->client->request('GET', '/api/resultat/me');
        $this->assertResponseStatusCodeSame(401);
    }

    public function testListResultats(): void
    {
        $this->createResultat(30);

        $this->client->request('GET', '/api/resultat', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ]);

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertIsArray($responseData);
    }

    public function testGetResultatById(): void
    {
        $resultat = $this->createResultat(60);

        $this->client->request('GET', '/api/resultat/' . $resultat->getId(), [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ]);

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals(60, $responseData['score']);
    }

    public function testUpdateResultatSuccess(): void
    {
        $resultat = $this->createResultat(42);

        $this->client->request('PUT', '/api/resultat/' . $resultat->getId(), [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ], json_encode([
            'score' => 99,
        ]));

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('Resultat updated', $responseData['message']);
    }

    public function testUpdateResultatUnauthorized(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $otherUser = new User();
        $otherUser->setEmail('other_' . uniqid() . '@example.com');
        $otherUser->setPassword($passwordHasher->hashPassword($otherUser, 'Password123!'));
        $otherUser->setScore(0);
        $otherUser->setCreatedAt(new \DateTime());
        $otherUser->setIsVerified(true);
        $otherUser->setVerificationToken(null);

        $em->persist($otherUser);

        $resultat = new Resultat();
        $resultat->setScore(42);
        $resultat->setUser($otherUser);
        $resultat->setDate(new \DateTimeImmutable());
        $resultat->setDetails(['category' => 'test']);

        $em->persist($resultat);
        $em->flush();

        $this->client->request('PUT', '/api/resultat/' . $resultat->getId(), [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ], json_encode([
            'score' => 99,
        ]));

        $this->assertResponseStatusCodeSame(403);
    }

    public function testDeleteResultatSuccess(): void
    {
        $resultat = $this->createResultat(42);

        $this->client->request('DELETE', '/api/resultat/' . $resultat->getId(), [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ]);

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('Resultat deleted', $responseData['message']);
    }

    public function testDeleteResultatUnauthorized(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $otherUser = new User();
        $otherUser->setEmail('other2_' . uniqid() . '@example.com');
        $otherUser->setPassword($passwordHasher->hashPassword($otherUser, 'Password123!'));
        $otherUser->setScore(0);
        $otherUser->setCreatedAt(new \DateTime());
        $otherUser->setIsVerified(true);
        $otherUser->setVerificationToken(null);

        $em->persist($otherUser);

        $resultat = new Resultat();
        $resultat->setScore(42);
        $resultat->setUser($otherUser);
        $resultat->setDate(new \DateTimeImmutable());
        $resultat->setDetails(['category' => 'test']);

        $em->persist($resultat);
        $em->flush();

        $this->client->request('DELETE', '/api/resultat/' . $resultat->getId(), [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->token
        ]);

        $this->assertResponseStatusCodeSame(403);
    }
}