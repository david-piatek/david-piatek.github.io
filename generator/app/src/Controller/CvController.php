<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Attribute\Route;

class CvController extends AbstractController
{
    #[Route('/')]
    public function index(string $cvFile): Response
    {
        $cv = json_decode(file_get_contents($cvFile), true);

        return $this->render('cv/index.html.twig', ['cv' => $cv]);
    }

    #[Route('/export')]
    public function export(string $exporterUrl): StreamedResponse
    {
        $pdf = file_get_contents($exporterUrl . '/export');

        return new StreamedResponse(function () use ($pdf) {
            echo $pdf;
        }, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="cv.pdf"',
            'Content-Length'      => strlen($pdf),
        ]);
    }
}
