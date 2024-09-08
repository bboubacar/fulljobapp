import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { menuPaths } from "../../utilities/constantes";
import { ImSpinner9 } from "react-icons/im";
import { tables } from "../../utilities/db_infos";
import useCreateuser from "../../hooks/useCreateuser";
import UserInput from "../../components/UserInput";
import usePageTitle from "../../hooks/usePageTitle";

const Newuser = ({ table = tables.candidats }) => {
    const { sms, isLoading, handleChange, handleSubmit } = useCreateuser(table);
    let redirect = menuPaths.connexionCandidat;
    usePageTitle("Inscription");

    // Par defaut la redirection est vers la connexion candidat et si' c'est un recruteur alors la redirection change
    if (table === tables.representants) redirect = menuPaths.connexionRecruteur;

    return (
        <section className="new-user">
            <form onSubmit={handleSubmit} className="new-user-container">
                <h1 className="new-user-title">Inscription</h1>
                <div className="server-err">{sms.serverErr}</div>
                <UserInput
                    handleChange={handleChange}
                    name="nom"
                    pholder="Nom"
                    label="votre nom"
                    message={sms.nom}
                />
                <UserInput
                    name="prenom"
                    pholder="Prénom"
                    label="votre prénom"
                    handleChange={handleChange}
                    message={sms.prenom}
                />

                <UserInput
                    name="email"
                    type="text"
                    pholder="Email"
                    label="votre adresse mail"
                    handleChange={handleChange}
                    message={sms.email}
                />

                <UserInput
                    name="password"
                    type="password"
                    pholder="Mot de passe"
                    label="votre mot de passe"
                    handleChange={handleChange}
                    message={sms.password}
                />

                <UserInput
                    name="rpwd"
                    type="password"
                    pholder="Repeter votre mot de passe"
                    label="repeter votre mot de passe"
                    handleChange={handleChange}
                    message={sms.rpwd}
                />
                <input
                    type="submit"
                    value="S'inscrire"
                    className="incription-btn"
                    aria-label="S'incrire'"
                />

                <div className="connexion">
                    <Link to={redirect}>Connexion</Link>
                </div>
                {isLoading && (
                    <div className="loading-container">
                        <ImSpinner9 />
                    </div>
                )}
            </form>
        </section>
    );
};

export default Newuser;
