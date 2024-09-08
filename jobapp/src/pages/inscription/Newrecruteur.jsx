import React from "react";
import { Link } from "react-router-dom";
import { menuPaths } from "../../utilities/constantes";
import usePageTitle from "../../hooks/usePageTitle";

const Newrecruteur = () => {
    usePageTitle("Inscription");
    return (
        <section className="new-user">
            <article className="new-user-container">
                <h1 className="new-user-title">Inscription</h1>
                <div className="nom-input input-container">
                    <input
                        type="text"
                        placeholder="nom de l'entreprise"
                        aria-label="Le nom de votre entreprise"
                    />
                </div>
                <div className="email-input input-container">
                    <input
                        type="text"
                        placeholder="email"
                        aria-label="votre adresse mail"
                    />
                </div>
                <div className="pwd-input input-container">
                    <input
                        type="password"
                        placeholder="mot de passe"
                        aria-label="votre mot de passe"
                    />
                </div>
                <div className="incription-btn" aria-label="S'incrire'">
                    <span>S'inscrire</span>
                </div>
                <div className="connexion">
                    <Link to={menuPaths.connexionRecruteur}>Connexion</Link>
                </div>
            </article>
        </section>
    );
};

export default Newrecruteur;
