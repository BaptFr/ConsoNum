<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use App\Entity\User;

class UserControllerTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testRegisterSuccess(): void
    {
        $email = 'test_register_' . time() . '@example.com';

        $this->client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!',
        ]));

        $this->assertResponseStatusCodeSame(201);

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('status', $responseData);
        $this->assertEquals('User created', $responseData['status']);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertArrayHasKey('id', $responseData['user']);
    }

    public function testRegisterWithInvalidData(): void
    {
        $this->client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => 'invalid-email',
            'password' => '123',
        ]));

        $this->assertResponseStatusCodeSame(400);
    }

    public function testRegisterWithMissingFields(): void
    {
        $this->client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => '',
            'password' => '',
        ]));

        $this->assertResponseStatusCodeSame(400);
    }

    public function testRegisterWithDuplicateEmail(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $email = 'duplicate_' . time() . '@example.com';

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, 'Password123!'));
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        $user->setIsVerified(true);
        $user->setVerificationToken(null);

        $em->persist($user);
        $em->flush();

        $this->client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!',
        ]));

        $this->assertResponseStatusCodeSame(409);
    }

    public function testVerifyWithValidToken(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $token = bin2hex(random_bytes(32));

        $user = new User();
        $user->setEmail('verify_' . time() . '@example.com');
        $user->setPassword($passwordHasher->hashPassword($user, 'Password123!'));
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        $user->setIsVerified(false);
        $user->setVerificationToken($token);

        $em->persist($user);
        $em->flush();

        $this->client->request('GET', '/api/users/verify/' . $token);

        $this->assertResponseStatusCodeSame(200);

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('Compte vérifié avec succès', $responseData['message']);
    }

    public function testVerifyWithInvalidToken(): void
    {
        $this->client->request('GET', '/api/users/verify/invalidtoken123');

        $this->assertResponseStatusCodeSame(404);
    }

    public function testVerifyAlreadyVerified(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $token = bin2hex(random_bytes(32));

        $user = new User();
        $user->setEmail('already_verified_' . time() . '@example.com');
        $user->setPassword($passwordHasher->hashPassword($user, 'Password123!'));
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        $user->setIsVerified(true);
        $user->setVerificationToken($token);

        $em->persist($user);
        $em->flush();

        $this->client->request('GET', '/api/users/verify/' . $token);

        $this->assertResponseStatusCodeSame(200);

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals('Compte déjà vérifié', $responseData['message']);
    }

    public function testMeAuthenticated(): void
    {
        $container = static::getContainer();
        $em = $container->get('doctrine')->getManager();
        $passwordHasher = $container->get('security.user_password_hasher');

        $email = 'me_' . time() . '@example.com';

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($passwordHasher->hashPassword($user, 'Password123!'));
        $user->setScore(0);
        $user->setCreatedAt(new \DateTime());
        $user->setIsVerified(true);
        $user->setVerificationToken(null);

        $em->persist($user);
        $em->flush();

        $this->client->request('POST', '/api/auth/login', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => $email,
            'password' => 'Password123!',
        ]));

        $loginData = json_decode($this->client->getResponse()->getContent(), true);
        $token = $loginData['token'];

        $this->client->request('GET', '/api/users/me', [], [], [
            'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
        ]);

        $this->assertResponseIsSuccessful();

        $responseData = json_decode($this->client->getResponse()->getContent(), true);
        $this->assertEquals($email, $responseData['email']);
    }

    public function testMeWithoutAuth(): void
    {
        $this->client->request('GET', '/api/users/me');
        $this->assertResponseStatusCodeSame(401);
    }
}
