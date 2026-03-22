<?php

namespace App\Tests\Security;

use App\Entity\User;
use App\Security\UserChecker;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;

class UserCheckerTest extends TestCase
{
    private UserChecker $checker;

    protected function setUp(): void
    {
        $this->checker = new UserChecker();
    }

    public function testCheckPreAuthWithUnverifiedUserThrowsException(): void
    {
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setIsVerified(false);

        $this->expectException(CustomUserMessageAuthenticationException::class);
        $this->expectExceptionMessage('Vous devez confirmer votre email avant de vous connecter.');

        $this->checker->checkPreAuth($user);
    }

    public function testCheckPreAuthWithNonUserObjectDoesNothing(): void
    {
        $notAUser = $this->createMock(UserInterface::class);

        $this->checker->checkPreAuth($notAUser);

        $this->addToAssertionCount(1);
    }
}
