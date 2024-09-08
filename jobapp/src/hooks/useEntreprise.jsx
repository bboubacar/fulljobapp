import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    axiosRequest,
    getAllEntreprises,
    redirectOnTokenFail,
    stopLoader,
} from "../utilities/functions";
import { methods, routes, tables } from "../utilities/db_infos";
import {
    menuPaths,
    notifSms,
    typeNotif,
    userToken,
} from "../utilities/constantes";

const useEntreprise = (userStatut, getUserStatuts) => {
    const [isSelOpen, setIsSelOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [entreprises, setEntreprises] = useState([]);
    const [entreprise, setEntreprise] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOnEdit, setIsOnEdit] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        try {
            const getData = async () => {
                // Si l'utilisateur n'a aucune affiliation lors on récupère la liste de toutes les entreprises

                if (!userStatut) {
                    const entrItem = await getAllEntreprises(
                        tables.representants
                    );
                    redirectOnTokenFail(
                        entrItem?.data,
                        menuPaths.connexionRecruteur,
                        navigate
                    );
                    setEntreprises(entrItem?.data?.data);
                } else {
                    const entrItem = await axiosRequest(
                        methods.get,
                        `${routes.representants}${routes.entreprise}/${tables.representants}`,
                        {},
                        true
                    );

                    setEntreprise(entrItem?.data?.data);
                }
            };
            getData();
        } catch (err) {
            console.log("erreur ", err);
        }
    }, [userStatut]);

    const selectEntreprise = () => {
        setIsSelOpen(!isSelOpen);
    };

    const entrepriseChange = (ev, option) => {
        try {
            setSelected(option);
            setIsSelOpen(false);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (!selected) return;

            let token = localStorage.getItem(userToken);
            if (token) {
                setIsLoading(true);

                const result = await axiosRequest(
                    methods.post,
                    `${routes.representants}${routes.change}/${tables.representants}`,
                    { id_entreprises: selected.id_entreprises },
                    true
                );

                redirectOnTokenFail(
                    result?.data,
                    menuPaths.connexionRecruteur,
                    navigate,
                    {
                        message: notifSms.modifSucces,
                        type: typeNotif.succes,
                    },
                    {
                        message: notifSms.modifFail,
                        type: typeNotif.succes,
                    }
                );
                getUserStatuts();
                stopLoader(setIsLoading, closeEdit);
            }
        } catch (err) {
            console.log("erreur ", err);
            setIsLoading(false);
            closeEdit();
        }
    };

    const openEdit = () => {
        setSelected(entreprise);
        setIsOnEdit(true);
    };

    const closeEdit = () => {
        setIsOnEdit(false);
    };

    return {
        closeEdit,
        openEdit,
        handleSubmit,
        entrepriseChange,
        selectEntreprise,
        isSelOpen,
        selected,
        entreprise,
        entreprises,
        isLoading,
        isOnEdit,
    };
};

export default useEntreprise;
