<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Event;
use Doctrine\ORM\EntityManagerInterface;

class EventDataPersister implements DataPersisterInterface
{
    private $entityManager;
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function supports($data): bool
    {
        return $data instanceof Event;
    }
    /**
    * @param Event $data
    */
    public function persist($data)
    {
        $data->setCreatedAt(new \DateTime('now'));
        $this->entityManager->persist($data);
        $this->entityManager->flush();
    }
    public function remove($data)
    {
        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }
}