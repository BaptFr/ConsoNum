<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class UserControllerTest extends WebTestCase
{
    public function testRegisterSuccess(): void
    {
        $client = static::createClient();
        
        //Unic mail
        $email = 'test_' . str_replace('.', '', microtime(true)) . '@example.com';
        
        $client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => $email,
            'password' => 'Test1234!',
        ]));

        $this->assertResponseStatusCodeSame(201);
        
        $responseData = json_decode($client->getResponse()->getContent(), true);
        
        // Struc
        $this->assertArrayHasKey('status', $responseData);
        $this->assertArrayHasKey('user', $responseData);
        $this->assertEquals('User created', $responseData['status']);
        $this->assertArrayHasKey('id', $responseData['user']);
        $this->assertArrayHasKey('email', $responseData['user']);
        $this->assertEquals($email, $responseData['user']['email']);
    }

    public function testRegisterWithInvalidData(): void
    {
        $client = static::createClient();
        
        $client->request('POST', '/api/users/register', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'email' => 'invalid-email',
            'password' => '123',
        ]));

        $this->assertResponseStatusCodeSame(400);
    }
}