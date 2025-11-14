<?php

namespace App\Entity;

use ApiPlatform\Metadata\Post;
use Symfony\Component\Validator\Constraints as Assert;


class UserLogin
{
    
    #[Assert\NotBlank]
    #[Assert\Email]
    public ?string $username = null;

    #[Assert\NotBlank]
    public ?string $password = null;
}
