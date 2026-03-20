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

    #[Route('/admin', methods: ['GET'])]
    public function admin(string $cvFile): Response
    {
        $json = file_get_contents($cvFile);

        return $this->render('cv/admin.html.twig', ['json' => $json]);
    }

    #[Route('/admin', methods: ['POST'])]
    public function adminSave(Request $request, string $cvFile): Response
    {
        $raw = $request->request->get('cv');

        $decoded = json_decode($raw);
        if ($decoded === null) {
            return $this->render('cv/admin.html.twig', [
                'json'  => $raw,
                'error' => 'JSON invalide : ' . json_last_error_msg(),
            ]);
        }

        file_put_contents($cvFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return $this->redirectToRoute('app_cv_admin');
    }

    #[Route('/{any}', requirements: ['any' => '.+'], priority: -1)]
    public function notFound(): RedirectResponse
    {
        return $this->redirect('/');
    }
}
