import React, { useEffect, useState } from "react";
import {
    actionsValues,
    adminActions,
    menuPaths,
    typeNotif,
} from "../../utilities/constantes";
import {
    axiosRequest,
    getAllEntreprises,
    redirectOnTokenFail,
    stopLoader,
} from "../../utilities/functions";
import { methods, routes, tables } from "../../utilities/db_infos";
import { useNavigate } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import OffresListe from "./OffresListe";
import Entreprise from "./Entreprises";
import Affiliation from "./Affiliation";
import Communes from "./Communes";
import Contrats from "./Contrats";

const Content = () => {
    const [selectedAct, setSelectedAct] = useState(adminActions[0]);
    const [isActionOpen, setIsActionOpen] = useState(false);
    const [pageContent, setPageContent] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const actionChange = (ev, option) => {
        try {
            setSelectedAct(option);
            setIsActionOpen(false);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    const openSelectAct = () => {
        setIsActionOpen(!isActionOpen);
    };

    const chooseFunc = async () => {
        switch (selectedAct?.value) {
            case actionsValues.validOffre:
                // Recupère la liste des offres
                await getData(routes.offres, routes.read_all);
                break;
            case actionsValues.validRecruteur:
                // Recupère les representants
                await getData(routes.representants, routes.pending);
                break;
            case actionsValues.addEntreprise:
                // Recupère la liste des entreprises
                await getEntrprises();
                break;
            case actionsValues.addCommunes:
                // Recupère les communes
                await getData(routes.communes, routes.read_all);
                break;
            case actionsValues.addContrat:
                // Recupère les contrats
                await getData(routes.contrats, routes.read_all);
                break;
        }
    };

    const getData = async (folder = null, action = null) => {
        const result = await axiosRequest(
            methods.get,
            `${folder}${action}/${tables.admin}`,
            null,
            true
        );
        updateContent(result);
    };

    const getEntrprises = async () => {
        const result = await getAllEntreprises(tables.admin);
        updateContent(result);
    };

    const updateContent = (result) => {
        redirectOnTokenFail(result?.data, menuPaths.connexionAdmin, navigate);
        setPageContent(result?.data?.data);
    };

    const checkNotif = async (result, succes = null, fail = null) => {
        redirectOnTokenFail(
            result?.data,
            menuPaths.connexionAdmin,
            navigate,
            {
                message: succes,
                type: typeNotif.succes,
            },
            {
                message: fail,
                type: typeNotif.fail,
            }
        );

        await chooseFunc();

        stopLoader(setIsLoading, null);
    };

    useEffect(() => {
        try {
            setPageContent([]);
            (async () => {
                setPageLoading(true);
                await chooseFunc();
                setPageLoading(false);
            })();
        } catch ($err) {
            setIsLoading(false);
        }
    }, [selectedAct]);

    const validInvalid = async (data, folder, route, succes, fail) => {
        setIsLoading(true);
        try {
            const result = await axiosRequest(
                methods.post,
                `${folder}${route}/${tables.admin}`,
                data,
                true
            );
            checkNotif(result, succes, fail);
        } catch ($err) {
            setIsLoading(false);
        }
    };

    return (
        <article className="admin-content">
            <h1>Administrateur</h1>
            <ChoixAction
                selectedAct={selectedAct}
                actionChange={actionChange}
                openSelectAct={openSelectAct}
                isActionOpen={isActionOpen}
            />
            {pageLoading ? (
                "Loading..."
            ) : actionsValues.validOffre === selectedAct.value &&
              pageContent?.length > 0 ? (
                <OffresListe offres={pageContent} validInvalid={validInvalid} />
            ) : actionsValues.validRecruteur === selectedAct.value &&
              pageContent?.length > 0 ? (
                <Affiliation users={pageContent} validInvalid={validInvalid} />
            ) : actionsValues.addEntreprise === selectedAct.value &&
              pageContent?.length > 0 ? (
                <Entreprise
                    entreprises={pageContent}
                    setIsLoading={setIsLoading}
                    updatePageContent={chooseFunc}
                    onContent={selectedAct?.value}
                />
            ) : actionsValues.addCommunes === selectedAct.value &&
              pageContent?.length > 0 ? (
                <Communes
                    communes={pageContent}
                    setIsLoading={setIsLoading}
                    updatePageContent={chooseFunc}
                    onContent={selectedAct?.value}
                />
            ) : actionsValues.addContrat === selectedAct.value &&
              pageContent?.length > 0 ? (
                <Contrats
                    contrats={pageContent}
                    setIsLoading={setIsLoading}
                    updatePageContent={chooseFunc}
                    onContent={selectedAct?.value}
                />
            ) : (
                "Pas d'action en attente"
            )}
            {isLoading && (
                <div className="loading-container">
                    <ImSpinner9 />
                </div>
            )}
        </article>
    );
};

const ChoixAction = ({
    selectedAct,
    actionChange,
    openSelectAct,
    isActionOpen,
}) => {
    return (
        <div className="select-options">
            <label htmlFor="select-options">Selectionnez une action</label>
            <div className="select" onClick={openSelectAct} id="select-options">
                {selectedAct ? selectedAct.title : "Selectionnez"}
            </div>
            <div
                className={
                    isActionOpen
                        ? "select-container open-options"
                        : "select-container"
                }
            >
                {adminActions?.map((act, idx) =>
                    selectedAct?.value !== act.value ? (
                        <span
                            className="option"
                            key={act.value + idx}
                            onClick={(event) => actionChange(event, act)}
                        >
                            {act?.title}
                        </span>
                    ) : (
                        ""
                    )
                )}
            </div>
        </div>
    );
};

export default Content;
