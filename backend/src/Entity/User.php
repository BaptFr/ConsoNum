<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column(type: "string")]
    private ?string $password = null;

    #[ORM\Column(type: "integer", nullable: true)]
    private ?int $score = null;

    #[ORM\Column(type: "datetime", options: ["default" => "CURRENT_TIMESTAMP"])]
    private ?\DateTimeInterface $createdAt = null;

    /**
     * @var Collection<int, Resultat>
     */
    #[ORM\OneToMany(targetEntity: Resultat::class, mappedBy: 'user', orphanRemoval: true)]
    private Collection $resultats;

    public function __construct()
    {
        $this->resultats = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getScore(): ?int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection<int, Resultat>
     */
    public function getResultats(): Collection
    {
        return $this->resultats;
    }

    public function addResultat(Resultat $resultat): static
    {
        if (!$this->resultats->contains($resultat)) {
            $this->resultats->add($resultat);
            $resultat->setUser($this);
        }

        return $this;
    }

    public function removeResultat(Resultat $resultat): static
    {
        if ($this->resultats->removeElement($resultat)) {
            // set the owning side to null (unless already changed)
            if ($resultat->getUser() === $this) {
                $resultat->setUser(null);
            }
        }

        return $this;
    }
}
