import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    axiosRequest,
    handleFile,
    inputChange,
    redirectOnTokenFail,
    removeSpace,
    setErrorSMSIfEmptyInput,
    stopLoader,
    validateEmail,
} from "../utilities/functions";
import { methods, routes } from "../utilities/db_infos";
import { notifSms, typeNotif, userToken } from "../utilities/constantes";
import useCommunes from "./useCommunes";
import useHandleForm from "./useHandleForm";

const useProfile = (userTable, path) => {
    const {
        selectCommune,
        communeChange,
        getAllCommunes,
        selectedCom,
        setSelectedCom,
        communes,
        isSelOpen,
    } = useCommunes(userTable);
    const [isLoading, setIsLoading] = useState(false);
    const requiredFields = ["nom", "prenom", "email"];
    const { handleChange, setModifData, modifData, sms, setSms, checkNotif } =
        useHandleForm(requiredFields, setIsLoading);
    const initialData = useRef(null);
    const initialCommune = useRef(null);
    const [isOnEdit, setIsOnEdit] = useState(false);
    const [resizedImg, setResizedImg] = useState(null);
    const [resizedBlob, setResizedBlob] = useState(null);
    const [uploadedCv, setUploadedCv] = useState(null);
    const [cvNom, setCvNom] = useState("");
    let navigate = useNavigate();

    // Get user informations
    const getUserData = useCallback(async () => {
        // Recupère les données user
        const result = await axiosRequest(
            methods.get,
            `${routes.users}${routes.single}/${userTable}`,
            {},
            true
        );
        redirectOnTokenFail(result?.data, path, navigate);
        const { data, status } = result?.data;

        // récupère la liste des communes
        const communesItem = await getAllCommunes();
        // Verifi si l'user appartient dejà à une commune
        const selected = communesItem?.filter(
            (com) =>
                com.commune === data?.commune &&
                com.code_postale === data?.code_postale
        );

        setSelectedCom(selected[0]);
        // Memorise la commune initiale
        initialCommune.current = selected[0];
        if (status) {
            for (let key in data) {
                setModifData((prev) => ({
                    ...prev,
                    [key]: data[key] ? data[key] : "",
                }));
            }

            // Memorise les données user initiale
            initialData.current = data;
            // On extrait le nom du cv du nom de la BD qui est un peu plus complexe
            if (data?.cv) {
                const splitNom = data?.cv.split("__").splice(-1)[0];
                setCvNom(splitNom);
            }

            setResizedBlob(null);
            setResizedImg(null);
        }
    });

    useEffect(() => {
        try {
            getUserData();
        } catch (err) {
            console.log("erreur ", err);
        }
    }, []);

    const requestFail = () => {
        setModifData(initialData.current);
        setSelectedCom(initialCommune.current);
    };

    const makeUpdate = async () => {
        try {
            let token = localStorage.getItem(userToken);

            let updateData = removeSpace(modifData);
            updateData.id_communes = selectedCom
                ? selectedCom?.id_communes
                : null;

            const formData = new FormData();
            for (let key in updateData) {
                // Ne pas ajouter l'url mit lors du chargement de l'image ou le cv s'il souhaite changer l'image
                if (key !== "avatar" && key !== "cv" && updateData[key])
                    formData.append(key, updateData[key]);
            }
            // Si le blob exite alors on l'ajoute
            if (resizedBlob)
                formData.append("avatar", resizedBlob, "avatar.jpeg");

            // Si un nouveau cv existe alors on l'ajoute
            if (uploadedCv) formData.append("cv", uploadedCv);

            if (token) {
                // Requête de mise à jour
                const result = await axiosRequest(
                    methods.post,
                    `${routes.users}${routes.update}/${userTable}`,
                    formData,
                    true
                );

                redirectOnTokenFail(
                    result?.data,
                    path,
                    navigate,
                    {
                        message: notifSms.modifSucces,
                        type: typeNotif.succes,
                    },
                    {
                        message: notifSms.modifFail,
                        type: typeNotif.fail,
                    }
                );

                // On met à jour le state
                getUserData();
                stopLoader(setIsLoading, onCancel);
            }
        } catch (err) {
            console.log("erreur ", err);
            requestFail();
            setIsLoading(false);
        }
    };

    const onSave = async () => {
        try {
            if (!isOnEdit) setIsOnEdit(true);
            else {
                let required = {
                    nom: modifData.nom,
                    prenom: modifData.prenom,
                    email: modifData.email,
                };
                let isFilled = setErrorSMSIfEmptyInput(setSms, required);

                if (!isFilled) {
                    if (modifData.email !== initialData?.current?.email) {
                        if (!validateEmail(modifData.email)) {
                            setSms({ email: "Format d'adresse mail invalid" });
                            isFilled = true;
                        } else {
                            setIsLoading(true);
                            // Verify is email is already used
                            let emailAva = await axiosRequest(
                                methods.post,
                                `${routes.users}${routes.verify_email}/${userTable}`,
                                { email: modifData.email }
                            );

                            if (!emailAva) {
                                setSms({ email: "Adresse email indisponble" });
                                isFilled = true;
                            }
                        }
                    } else setIsLoading(true);

                    if (!isFilled) await makeUpdate();
                    else
                        setTimeout(() => {
                            setIsLoading(false);
                            setResizedImg(null);
                            setResizedBlob(null);
                        }, 1500);
                }
            }
        } catch (err) {
            console.log("erreur ", err);
            setIsLoading(false);
        }
    };

    // On reinitilise toutes les mofications
    const onCancel = () => {
        setModifData(initialData.current);
        setSelectedCom(initialCommune.current);
        setIsOnEdit(false);
        setResizedBlob(null);
        setResizedImg(null);
        setUploadedCv(null);
        setSms({});
    };

    // Au chargement de l'image ou de cv, verifi le type, la taille. Si c'est une image la redimensionne
    const handleFileUpload = (event) => {
        handleFile(
            event,
            setModifData,
            setSms,
            setResizedBlob,
            setResizedImg,
            setUploadedCv
        );
    };

    return {
        isOnEdit,
        onSave,
        sms,
        modifData,
        handleChange,
        cvNom,
        selectedCom,
        communes,
        communeChange,
        selectCommune,
        isSelOpen,
        isLoading,
        resizedImg,
        onCancel,
        handleFileUpload,
        uploadedCv,
    };
};

export default useProfile;
