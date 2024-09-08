import React, { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
    axiosRequest,
    errorOnEmptyFields,
    inputChange,
    redirectOnTokenFail,
    removeSpace,
    returnRouteFolder,
    returnUpdateId,
    stopLoader,
    veryExist,
} from "../utilities/functions";
import {
    actionsValues,
    menuPaths,
    notifSms,
    typeNotif,
    userToken,
} from "../utilities/constantes";
import { useNavigate } from "react-router-dom";
import { methods, routes } from "../utilities/db_infos";

const useHandleForm = (
    requiredFields,
    setIsLoading,
    updatePageContent = null,
    onContent = "",
    updataSelect = null
) => {
    const [modifData, setModifData] = useState(null);
    const [isOnEdit, setIsOnEdit] = useState(false);
    const [isOnAdd, setIsOnAdd] = useState(false);
    const initialData = useRef(null);
    const [sms, setSms] = useState({});
    const navigate = useNavigate();
    let role = "";
    const token = localStorage.getItem(userToken);

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded?.role ? decoded?.role : "";
    }

    useEffect(() => {
        cancel();
    }, [onContent]);

    const openAdd = () => {
        setIsOnAdd(true);
    };

    const openEdit = (current) => {
        try {
            setModifData(current);
            // Memorise les données user initiale
            initialData.current = current;
            if (typeof updataSelect === "function") updataSelect(current);
            setIsOnEdit(true);
            setIsOnAdd((prev) => true);
            setSms({});
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    const cancel = () => {
        setIsOnAdd(false);
        setIsOnEdit(false);
        setModifData(null);
        setSms({});
        initialData.current = null;
        if (typeof updataSelect === "function") updataSelect();
    };

    const handleChange = (event) => {
        inputChange(event, setModifData, setSms, requiredFields);
    };

    const checkNotif = async (result, succes = null, fail = null) => {
        redirectOnTokenFail(
            result?.data,
            menuPaths.connexionRecruteur,
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
        await updatePageContent(onContent);

        stopLoader(setIsLoading, null);
    };

    const handleSub = async (event) => {
        try {
            let isFilled = errorOnEmptyFields(
                setSms,
                modifData,
                requiredFields
            );

            if (!isFilled) {
                setIsLoading(true);
                const cleanedData = removeSpace(modifData);
                let folder = returnRouteFolder(onContent);
                let is_exist = true;

                if (
                    (actionsValues.addCommunes === onContent &&
                        initialData?.current?.code_postale !=
                            cleanedData?.code_postale) ||
                    (actionsValues.addContrat === onContent &&
                        initialData?.current?.type != cleanedData?.type)
                ) {
                    is_exist = await veryExist(folder, cleanedData, navigate);
                }

                if (!is_exist) {
                    setSms({ already: "already" });
                    stopLoader(setIsLoading, null);
                    return;
                }

                setSms({});
                let result = null;
                if (isOnEdit) {
                    // Requête de mise à jour
                    result = await axiosRequest(
                        methods.post,
                        `${folder}${routes.update}/${role}`,
                        cleanedData,
                        true
                    );

                    checkNotif(
                        result,
                        notifSms.modifSucces,
                        notifSms.modifFail
                    );
                } else if (isOnAdd) {
                    // Requête d'ajout
                    result = await axiosRequest(
                        methods.post,
                        `${folder}${routes.create}/${role}`,
                        cleanedData,
                        true
                    );

                    checkNotif(result, notifSms.addSucces, notifSms.addFail);
                }
                cancel();
            }
        } catch (err) {
            console.log("erreur ", err);
            cancel();
        }
    };

    const onDelete = async (current) => {
        let folder = returnRouteFolder(onContent);
        let id = returnUpdateId(onContent, current);

        try {
            setIsLoading(true);
            const result = await axiosRequest(
                methods.del,
                `${folder}${routes.delete}/${role}`,
                id,
                true
            );
            checkNotif(result, notifSms.supprSucces, notifSms.supprFail);
        } catch (err) {
            console.log("erreur ", err);
            setIsLoading(false);
        }
    };

    const validInvalid = async (data, folder, route, succes, fail) => {
        setIsLoading(true);
        try {
            const result = await axiosRequest(
                methods.post,
                `${folder}${route}/${role}`,
                data,
                true
            );
            checkNotif(result, succes, fail);
        } catch ($err) {
            setIsLoading(false);
        }
    };

    return {
        handleSub,
        handleChange,
        cancel,
        openEdit,
        openAdd,
        modifData,
        setModifData,
        isOnAdd,
        onDelete,
        sms,
        setSms,
        checkNotif,
        validInvalid,
    };
};

export default useHandleForm;
