<?php

namespace App\Src;

use App\Controllers\UsersController;
use Exception;

/**
 * Router principal
 */
class Main
{
    public function start()
    {
        // On retire le "/" éventuel de l'URL

        // On récupère l'URL
        $uri = $_SERVER['REQUEST_URI'];

        // On verifie que le uri n'est pas vide, n'est pas égale à "/" et se termine par un "/"
        if (!empty($uri) && $uri !== '/' && $uri[-1] === "/") {
            // On enlève le '/' de la fin
            $uri = substr($uri, 0, -1);
        }

        // On gère les paramètres d'URL
        // p=controleur/methode/paramètres
        // On sépare les paramètres dans un tableau

        $params = explode('/', $_GET['p']);
        // On verifie qu'on a au moins un paramètre
        if ($params[0] !== "") {
            // Tout d'abor on verifie l'existance du controller
            if (in_array($params[0], CONTROLLERS)) {
                // On instancie le controlleur
                // On recupère le controlleur à instancier
                // On met une majuscule en 1ère lettre, on ajoute le namespace complet avant et on ajoute "controller" après
                $controller = '\\App\\Controllers\\' . ucfirst(array_shift($params)) . 'Controller';

                $controller = new $controller();

                // On recupère le 2ème paramèttre d'URL
                $action = (isset($params[0]) ? array_shift($params) : 'index');
                if (method_exists($controller, $action)) {
                    // S'il reste des paramètres on les passe à la méthode
                    isset($params[0]) ? $controller->$action($params) : $controller->$action();
                }
            }
        }
        // Si aucune des action plus haut n'est effectuer alors cette erreur est renvoyer
        $controller = new UsersController;
        $controller->response(CODE['400']['code'], false, CODE['400']['text']);
    }
}
