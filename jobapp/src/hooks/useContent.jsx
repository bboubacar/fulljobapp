import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    dashboardName,
    dashboardTab,
    menuPaths,
} from "../utilities/constantes";
import {
    axiosRequest,
    redirectOnTokenFail,
    returnRouteFolder,
} from "../utilities/functions";
import { methods, routes, tables } from "../utilities/db_infos";

const useContent = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dashContent, setDashContent] = useState(null);
    const [pageLoading, setPageLoading] = useState(false);
    const navigate = useNavigate();

    const getData = useCallback((name) => {
        try {
            setPageLoading(true);
            // Reinitialise le contents de dashContent pour afficher le loading
            setDashContent((prev) => ({ ...prev, contents: [] }));

            dashboardTab.map(async (data) => {
                if (data.name === name) {
                    // On recupère le controller
                    let routeFolder = returnRouteFolder(name);
                    // si c'est l'onglet candidatures l'action change
                    const action =
                        name === dashboardName.candidatures
                            ? routes.read_allbyuser
                            : routes.read_all;

                    const result = await axiosRequest(
                        methods.get,
                        `${routeFolder}${action}/${tables.candidats}`,
                        {},
                        true
                    );

                    redirectOnTokenFail(
                        result?.data,
                        menuPaths.connexionCandidat,
                        navigate
                    );

                    data.contents = result?.data?.data
                        ? result?.data?.data
                        : [];
                    setDashContent(data);
                    setPageLoading(false);
                }
            });
        } catch (err) {
            setPageLoading(false);
            console.log("erreur ", err);
        }
    }, []);

    useEffect(() => {
        setActiveTab(0);

        getData(dashboardName.experiences);
    }, []);

    const toggleTab = async (element, idx) => {
        try {
            setActiveTab(idx);
            getData(element.name);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    return {
        toggleTab,
        getData,
        activeTab,
        dashContent,
        pageLoading,
    };
};

export default useContent;
