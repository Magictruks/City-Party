<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\AnswersRepository;
use App\Repository\ScenariosCompletesRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/promoters", name="promoters", 
     * methods={"get"})
     * 
     * */
    public function getAllPromoters(UserRepository $userRepository)
    {
        return $this->json($userRepository->getPromoters(), 200, [], []);
    }

    /**
     * @Route("/api/countscenarios/{year}", name="countscenarios", 
     * methods={"get"})
     * 
     * */
    // public function countScenarios(ScenariosCompletesRepository $scenariosCompletesRepository, $year)
    // {
    //     return $this->json($scenariosCompletesRepository->count($year), 200, [], ['groups' => 'read:scenarios']);
    // }
}
