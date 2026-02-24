<?php

namespace App\Entity;

use App\Repository\ResultatRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ResultatRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Resultat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['resultat:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['resultat:read'])]
    private ?float $score = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    #[Groups(['resultat:read'])]
    private ?\DateTimeImmutable $date = null;

    #[ORM\ManyToOne(inversedBy: 'resultats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Question::class)]
    #[ORM\JoinColumn(nullable: true)]
    private ?Question $question = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['resultat:read'])]
    private ?array $details = null;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        if (!$this->date) {
            $this->date = new \DateTimeImmutable();
        }
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): ?float
    {
        return $this->score;
    }

    public function setScore(float $score): static
    {
        $this->score = $score;

        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getDetails(): ?array
    {
        return $this->details;
    }

    public function setDetails(?array $details): static
    {
        $this->details = $details;

        return $this;
    }


    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getQuestion(): ?Question { return $this->question; }
    public function setQuestion(Question $question): self { $this->question = $question; return $this; }
}
