<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{

    #[Route('/auth/login', name: 'api_login_check', methods: ['POST'])]
    public function login()
    {
      
        throw new \LogicException('This method should not be reached!');
    }
}