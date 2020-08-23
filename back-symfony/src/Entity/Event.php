<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use App\Repository\EventRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ApiResource()
 * @ApiFilter(SearchFilter::class, properties={"id": "exact", "label": "partial"})
 * @ApiFilter(DateFilter::class, properties={"date_begin_at"})
 * @ORM\Entity(repositoryClass=EventRepository::class)
 */
class Event
{
    /**
     * @Groups("categories")
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("categories")
     * @ORM\Column(type="string", length=255)
     */
    private $label;

    /**
     * @Groups("categories")
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @Groups("categories")
     * @ORM\Column(type="datetime")
     */
    private $date_begin_at;

    /**
     * @Groups("categories")
     * @ORM\Column(type="datetime")
     */
    private $date_end_at;

    /**
     * @Groups("categories")
     * @ORM\Column(type="datetime")
     */
    private $created_at;

    /**
     * @Groups("categories")
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @Groups("categories")
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="events")
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity=Category::class, inversedBy="events")
     */
    private $category;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://localhost:8000/image")
     */
    public $image;

    public function __construct()
    {
        $this->category = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getDateBeginAt(): ?\DateTimeInterface
    {
        return $this->date_begin_at;
    }

    public function setDateBeginAt(\DateTimeInterface $date_begin_at): self
    {
        $this->date_begin_at = $date_begin_at;

        return $this;
    }

    public function getDateEndAt(): ?\DateTimeInterface
    {
        return $this->date_end_at;
    }

    public function setDateEndAt(\DateTimeInterface $date_end_at): self
    {
        $this->date_end_at = $date_end_at;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Category[]
     */
    public function getCategory(): Collection
    {
        return $this->category;
    }

    public function addCategory(Category $category): self
    {
        if (!$this->category->contains($category)) {
            $this->category[] = $category;
        }

        return $this;
    }

    public function removeCategory(Category $category): self
    {
        if ($this->category->contains($category)) {
            $this->category->removeElement($category);
        }

        return $this;
    }
}
