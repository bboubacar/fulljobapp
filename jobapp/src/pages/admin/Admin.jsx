import React, { useEffect } from "react";
import Content from "./Content";
import { verifyToken } from "../../utilities/functions";
import { tables } from "../../utilities/db_infos";
import { useNavigate } from "react-router-dom";
import { menuPaths, userToken } from "../../utilities/constantes";
import usePageTitle from "../../hooks/usePageTitle";

const Admin = () => {
    let navigate = useNavigate();
    usePageTitle("Administrateur");

    // useEffect(() => {
    //     // Verifi la session de l'utilisateur ou le redirige vers la page connexion
    //     try {
    //         let token = localStorage.getItem(userToken);
    //         const verify = async () => {
    //             let is_token = await verifyToken(token, tables.candidats);
    //             if (!is_token) navigate(menuPaths.connexionCandidat);
    //         };
    //         verify();
    //     } catch (err) {
    //         console.log("erreur ", err);
    //     }
    // }, []);

    return (
        <section className="admin">
            <Content />
        </section>
    );
};

export default Admin;
