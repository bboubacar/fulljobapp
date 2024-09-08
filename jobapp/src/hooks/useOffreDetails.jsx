import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    fromOffre,
    menuPaths,
    notifSms,
    offreData,
    typeNotif,
    userToken,
} from "../utilities/constantes";
import {
    axiosRequest,
    dispatchNotification,
    redirectOnTokenFail,
    stopLoader,
    verifyToken,
} from "../utilities/functions";
import { methods, routes, tables } from "../utilities/db_infos";

const useOffreDetails = () => {
    const [offre, setOffre] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [already, setAlready] = useState(false);
    let { id } = useParams();
    const navigate = useNavigate();
    let location = useLocation();

    // Pour le message
    const handleChange = (event) => {
        if (event.target.value !== "")
            setData((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
    };

    // Verifi s'il a dejà candidater pour cette offre
    const verifier = async () => {
        let token = localStorage.getItem(userToken);

        let is_exist = null;
        if (!token) {
            redirectConnect();
            return is_exist;
        }
        const decoded = jwtDecode(token);
        if (decoded?.role === tables.representants) {
            dispatchNotification({
                message: notifSms.rightOffre,
                type: typeNotif.fail,
            });
            return;
        }

        setIsLoading(true);
        // On verifi si le token n'est plus valide
        let is_token = await verifyToken(token, tables.candidats);
        if (!is_token) redirectConnect();
        else {
            // Verify if already apply
            is_exist = await axiosRequest(
                methods.post,
                `${routes.candidatures}${routes.verify}/${tables.candidats}`,
                { id_offres_demploi: offre?.id_offres_demploi },
                true
            );

            if (!is_exist) {
                setAlready(true);
                stopLoader(setIsLoading, null, {
                    message: notifSms.already,
                    type: typeNotif.fail,
                });
            } else setAlready(false);
        }

        return is_exist;
    };

    // Redirige vers la page connexion tout en enregistrant l'offre comme prochaine page apres connection
    const redirectConnect = () => {
        localStorage.setItem(fromOffre, location.pathname);
        navigate(menuPaths.connexionCandidat);
    };

    // Envoyer sa candidature
    const postuler = async () => {
        try {
            // Verifier s'il a dejà candidater
            const canApply = await verifier();
            if (canApply) {
                const result = await axiosRequest(
                    methods.post,
                    `${routes.candidatures}${routes.create}/${tables.candidats}`,
                    data,
                    true
                );

                redirectOnTokenFail(
                    result?.data,
                    menuPaths.connexionCandidat,
                    navigate,
                    {
                        message: notifSms.sent,
                        type: typeNotif.succes,
                    },
                    {
                        message: notifSms.failSent,
                        type: typeNotif.fail,
                    }
                );
                stopLoader(setIsLoading, null);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // On recupère l'offre l'offre selectionner stocker dans localStorage
        let current = localStorage.getItem(offreData);

        if (current) {
            current = JSON.parse(current);
            if (current?.id_offres_demploi === parseInt(id)) {
                setData({ id_offres_demploi: current.id_offres_demploi });
                setOffre(current);
            } else navigate(menuPaths.offres);
        } else navigate(menuPaths.offres);
    }, []);

    return { isLoading, already, postuler, handleChange, offre, data };
};

export default useOffreDetails;
