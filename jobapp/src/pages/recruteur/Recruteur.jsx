import React, { useCallback, useEffect, useState } from "react";
import Content from "./Content";
import Profile from "./Profile";
import Entreprise from "./Entreprise";
import { axiosRequest, verifyToken } from "../../utilities/functions";
import { menuPaths, userToken } from "../../utilities/constantes";
import { methods, routes, tables } from "../../utilities/db_infos";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../../hooks/usePageTitle";

const Recruteur = () => {
    const [userStatut, setUserStatut] = useState(null);
    usePageTitle("Recruteur");
    let navigate = useNavigate();
    const getUserStatuts = useCallback(async () => {
        const result = await axiosRequest(
            methods.get,
            `${routes.representants}${routes.validate}/${tables.representants}`,
            {},
            true
        );
        setUserStatut(result?.data?.data);
    }, []);

    useEffect(() => {
        const verify = async () => {
            try {
                let token = localStorage.getItem(userToken);
                let is_token = await verifyToken(token, tables.representants);
                if (!is_token) {
                    navigate(menuPaths.connexionRecruteur);
                } else {
                    getUserStatuts();
                }
            } catch (err) {
                console.log("erreur ", err);
            }
        };
        verify();
    }, []);

    return (
        <section className="recruteur">
            <Entreprise
                userStatut={userStatut}
                getUserStatuts={getUserStatuts}
            />
            <Profile />
            <Content userStatut={userStatut} />
        </section>
    );
};

export default Recruteur;
