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
        
        $em->persist($this->user);
        $em->flush();

        //Get JWT
        $this->client->request('POST', '/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!'
        ]));

        $loginData = json_decode($this->client->getResponse()->getContent(), true);
        $this->token = $loginData['token'];
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
        //Resu lcreation for the User created
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        
        $resultat = new Resultat();
        $resultat->setScore(50);
        $resultat->setUser($this->user);
        $resultat->setDate(new \DateTimeImmutable());
        $resultat->setDetails(['category' => 'test', 'notes' => 'Test details']);         
        $em->persist($resultat);
        $em->flush();

        //Get results
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
}
