import React, { useCallback, useEffect, useState } from "react";
import Tabs from "./Tabs";
import {
    menuPaths,
    recruteurDashboardName,
    recruteurDashboardTab,
    userValide,
} from "../../utilities/constantes";
import { useNavigate } from "react-router-dom";
import { axiosRequest, redirectOnTokenFail } from "../../utilities/functions";
import { methods, routes, tables } from "../../utilities/db_infos";
import TabRecruteur from "./TabRecruteur";

const Content = ({ userStatut }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [dashContent, setDashContent] = useState({});
    const [pageLoading, setPageLoading] = useState(false);
    const [offres, setOffres] = useState([]);
    const [contrats, setContrats] = useState([]);
    const navigate = useNavigate();

    const getOffres = useCallback(async () => {
        try {
            let result = [];
            setPageLoading(true);
            // Reinitialise le contents de dashContent pour afficher le loading
            setDashContent((prev) => ({ ...prev, contents: [] }));
            setOffres([]);
            setOffres([]);
            result = await axiosRequest(
                methods.get,
                `${routes.offres}${routes.read_allbyuser}/${tables.representants}`,
                {},
                true
            );

            redirectOnTokenFail(
                result?.data,
                menuPaths.connexionRecruteur,
                navigate
            );
            setOffres(result?.data?.data ? result?.data?.data : []);
            recruteurDashboardTab.map((data) => {
                if (data.name === recruteurDashboardName.offres) {
                    data.contents = result?.data?.data
                        ? result?.data?.data
                        : [];
                    data?.contents?.map((offre) => (offre.isOpen = false));
                    data.isOpen = false;
                    setDashContent(data);
                    setPageLoading(false);
                }
            });
        } catch (err) {
            setPageLoading(false);
            console.log("erreur ", err);
        }
    }, []);

    const getAllContrats = useCallback(async () => {
        const result = await axiosRequest(
            methods.get,
            `${routes.contrats}${routes.read_all}/${tables.representants}`,
            {},
            true
        );
        redirectOnTokenFail(
            result?.data,
            menuPaths.connexionRecruteur,
            navigate
        );
        setContrats(result?.data?.data ? result?.data?.data : []);
    }, []);

    // Toggle les offres dans l'onglet candidatures
    const toggleOffres = (current) => {
        const newOffres = offres;
        if (current.isOpen) {
            newOffres?.map((offre) => {
                offre.isOpen = false;
            });
        } else {
            newOffres?.map((offre) => {
                if (offre?.id_offres_demploi !== current?.id_offres_demploi)
                    offre.isOpen = false;
                else offre.isOpen = true;
            });
        }
        setOffres(newOffres);
    };

    useEffect(() => {
        setActiveTab(0);
        getOffres(recruteurDashboardName.offres);
        getAllContrats();
    }, []);

    const toggleTab = async (element, idx) => {
        try {
            setActiveTab(idx);
            if (element.name === recruteurDashboardName.offres) getOffres();
            else setDashContent(element);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    return userStatut?.valid === userValide.valid ? (
        <article className="contents">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
            <TabRecruteur
                dashContent={dashContent}
                updateState={getOffres}
                pageLoading={pageLoading}
                activeTab={activeTab}
                contrats={contrats}
                offres={offres}
                toggleOffres={toggleOffres}
            />
        </article>
    ) : (
        <div className="desacitiver">Services indisponibles</div>
    );
};

export default Content;
