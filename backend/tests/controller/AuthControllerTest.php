<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\User;

class AuthControllerTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testLoginSuccess(): void
    {   //user creation test
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $email = 'test_login_' . time() . '@example.com';
        
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, 'Password123!'));
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        
        $em->persist($user);
        $em->flush();

        //Login test
        $this->client->request('POST', '/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!'
        ]));

        $this->assertResponseIsSuccessful();
        $data = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('token', $data);
        $this->assertNotEmpty($data['token']);
    }

    public function testLoginWithInvalidCredentials(): void
    {
        $this->client->request('POST', '/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json'
        ], json_encode([
            'email' => 'wrong@email.com',
            'password' => 'WrongPassword'
        ]));

        $this->assertResponseStatusCodeSame(401);
    }
}
