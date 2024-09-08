import { v4 as uuidv4 } from "uuid";
import AddInput from "../../components/AddInput";
import AddSaveBtn from "../../components/AddSaveBtn";
import EditCommunes from "../../components/EditCommunes";
import EditDeleteItem from "../../components/EditDeleteItem";
import Image from "../../components/Image";
import {
    axiosRequest,
    buildFormdata,
    errorOnEmptyFields,
    handleFile,
    stopLoader,
    veryExist,
} from "../../utilities/functions";
import useCommunes from "../../hooks/useCommunes";
import Avatar from "../../components/Avatar";
import { useEffect, useRef, useState } from "react";
import { methods, routes, tables } from "../../utilities/db_infos";
import { actionsValues, notifSms } from "../../utilities/constantes";
import useHandleForm from "../../hooks/useHandleForm";
import { useNavigate } from "react-router-dom";

const Entreprise = ({
    entreprises,
    setIsLoading,
    updatePageContent,
    onContent,
}) => {
    const [isOnAdd, setIsOnAdd] = useState(false);
    const [isOnEdit, setIsOnEdit] = useState(false);
    const initialData = useRef(null);
    const [resizedImg, setResizedImg] = useState(null);
    const [resizedBlob, setResizedBlob] = useState(null);
    const navigate = useNavigate();

    const requiredFields = ["nom", "siret"];
    const {
        handleChange,
        setModifData,
        modifData,
        sms,
        setSms,
        onDelete,
        checkNotif,
    } = useHandleForm(
        requiredFields,
        setIsLoading,
        updatePageContent,
        onContent
    );

    const {
        selectCommune,
        communeChange,
        getAllCommunes,
        selectedCom,
        setSelectedCom,
        communes,
        isSelOpen,
    } = useCommunes(tables.admin);

    useEffect(() => {
        (async () => await getAllCommunes())();
    }, []);

    useEffect(() => {
        setModifData((prev) => ({
            ...prev,
            id_communes: selectedCom?.id_communes,
        }));
    }, [selectedCom]);

    const openAdd = () => {
        setIsOnAdd(true);
    };

    const cancel = () => {
        setIsOnAdd(false);
        setIsOnEdit(false);
        initialData.current = null;
        setModifData(null);
        setSms({});
        setSelectedCom(null);
        setResizedImg(null);
        setResizedBlob(null);
    };

    const openEdit = (current) => {
        try {
            setModifData(current);
            // Memorise les données user initiale
            initialData.current = current;
            setIsOnEdit(true);
            const selected = communes?.filter(
                (com) =>
                    com.commune === current?.commune &&
                    com.code_postale === current?.code_postale
            );
            setSelectedCom(selected[0]);
            setIsOnAdd(true);
            setSms({});
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    const handleSub = async () => {
        try {
            let isFilled = errorOnEmptyFields(
                setSms,
                modifData,
                requiredFields
            );

            if (!isFilled) {
                setIsLoading(true);
                const formData = buildFormdata(
                    modifData,
                    resizedBlob,
                    "logo",
                    "png"
                );
                let is_exist = true;
                if (
                    onContent === actionsValues.addEntreprise &&
                    initialData?.current?.siret != modifData?.siret
                ) {
                    is_exist = await veryExist(
                        routes.entreprises,
                        modifData,
                        navigate
                    );
                }

                if (!is_exist) {
                    setSms((prev) => ({
                        ...prev,
                        siret: "Ce siret est déjà enregistré",
                    }));
                    stopLoader(setIsLoading, null);
                    return;
                }

                setSms({});
                let result = null;
                if (isOnEdit) {
                    // Requête de mise à jour
                    result = await axiosRequest(
                        methods.post,
                        `${routes.entreprises}${routes.update}/${tables.admin}`,
                        formData,
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
                        `${routes.entreprises}${routes.create}/${tables.admin}`,
                        formData,
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

    // Au chargement de l'image ou de cv, verifi le type, la taille. Si c'est une image la redimensionne
    const handleFileUpload = (event) => {
        handleFile(event, setModifData, setSms, setResizedBlob, setResizedImg);
    };

    return (
        <div className="entreprises">
            <AddSaveBtn
                isOnAdd={isOnAdd}
                cancel={cancel}
                onSubmit={handleSub}
                openAdd={openAdd}
            />
            <AddEntreprise
                isOnAdd={isOnAdd}
                data={modifData}
                handleChange={handleChange}
                sms={sms}
                logo={
                    <Avatar
                        sms={sms}
                        userDetails={modifData}
                        resizedImg={resizedImg}
                        isOnEdit={true}
                        handleFileUpload={handleFileUpload}
                        attrImg="logo"
                    />
                }
            >
                <EditCommunes
                    selectedCom={selectedCom}
                    communes={communes}
                    communeChange={communeChange}
                    selectCommune={selectCommune}
                    isOnEdit={true}
                    isSelOpen={isSelOpen}
                />
            </AddEntreprise>
            <div className="items">
                {entreprises?.map((entreprise) => (
                    <div className="item" key={uuidv4()}>
                        <EditDeleteItem
                            openEdit={openEdit}
                            onDelete={onDelete}
                            content={entreprise}
                            text="La suppression de l'entreprise"
                        />
                        <div className="logo-siret">
                            <Image
                                data={entreprise}
                                resizedImg=""
                                attrImg="logo"
                            />
                            <div className="titre">{entreprise?.nom}</div>
                            <div>
                                <strong>Siret : </strong> {entreprise?.siret}
                            </div>
                        </div>
                        <div>{entreprise?.domaine}</div>
                        <div>
                            <strong>Siège : </strong>
                            {entreprise?.code_postale
                                ? entreprise?.code_postale
                                : ""}
                            {entreprise?.commune
                                ? " " + entreprise?.commune
                                : ""}

                            {entreprise?.num_rue && `, ${entreprise?.num_rue}`}
                            {entreprise?.nom_rue && `, ${entreprise?.nom_rue}`}
                            {entreprise?.complement &&
                                `, ${entreprise?.complement}`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AddEntreprise = ({
    children,
    data,
    sms,
    handleChange,
    isOnAdd,
    logo,
}) => {
    return (
        <div className={isOnAdd ? "add-dash-form open-form" : "add-dash-form"}>
            <div className="logo-nom">
                {logo}
                <AddInput
                    label="Nom de l'entreprise"
                    name="nom"
                    value={data?.nom ? data?.nom : ""}
                    sms={sms}
                    onChange={handleChange}
                />
            </div>
            <AddInput
                label="Siret de l'entreprise"
                name="siret"
                value={data?.siret ? data?.siret : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Domaines d'activités"
                name="domaine"
                value={data?.domaine ? data?.domaine : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Numéro de rue"
                name="num_rue"
                value={data?.num_rue ? data?.num_rue : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Nom de rue"
                name="nom_rue"
                value={data?.nom_rue ? data?.nom_rue : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Complement"
                name="complement"
                value={data?.complement ? data?.complement : ""}
                sms={sms}
                onChange={handleChange}
            />
            {children}
        </div>
    );
};

export default Entreprise;
