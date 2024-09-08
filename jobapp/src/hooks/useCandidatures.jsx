import React, { useState } from "react";
import {
    axiosRequest,
    redirectOnTokenFail,
    returnUpdateId,
    stopLoader,
} from "../utilities/functions";
import { methods, routes, tables } from "../utilities/db_infos";
import { useNavigate } from "react-router-dom";
import {
    dashboardName,
    menuPaths,
    notifSms,
    recruteurDashboardName,
} from "../utilities/constantes";
import useHandleForm from "./useHandleForm";

const useCandidatures = (toggleOffres) => {
    const [rejLoading, setRejLoading] = useState(false);
    const [candidatures, setCandidatures] = useState(null);
    const [offreLoading, setOffreLoading] = useState(false);
    const [selectedOffre, setSelectedOffre] = useState(null);
    const navigate = useNavigate();

    // Récupère les candidatures d'une offre
    const getCandidatures = async (data) => {
        const result = await axiosRequest(
            methods.get,
            `${routes.candidatures}${routes.read_all}/${tables.representants}/${data.id_offres_demploi}`,
            {},
            true
        );

        redirectOnTokenFail(
            result?.data,
            menuPaths.connexionRecruteur,
            navigate
        );

        if (result?.data?.status) setCandidatures(result?.data?.data);
    };

    const { validInvalid } = useHandleForm(
        [],
        setRejLoading,
        () => getCandidatures(selectedOffre),
        recruteurDashboardName.candidatures
    );

    // Liste les candidatures d'une offre
    const toggleOff = async (current) => {
        if (offreLoading || rejLoading) return;

        try {
            setSelectedOffre(current);
            toggleOffres(current);
            setOffreLoading(true);
            await getCandidatures(current);
            stopLoader(setOffreLoading, null, null);
        } catch (err) {
            console.log(err);
        }
    };

    // Rejeter une candidaturer
    const rejeter = async (current) => {
        const id = returnUpdateId(dashboardName.candidatures, current);

        validInvalid(
            id,
            routes.candidatures,
            routes.update,
            notifSms.rejet,
            notifSms.failRejet
        );
    };

    return {
        rejeter,
        toggleOff,
        rejLoading,
        offreLoading,
        candidatures,
    };
};

export default useCandidatures;
