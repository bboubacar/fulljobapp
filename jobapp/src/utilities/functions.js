import axios from "axios";
import { methods, routes, tables } from "./db_infos";
import { actionsValues, dashboardName, menuPaths, notifSms, offreData, recruteurDashboardName, sousMenuNames, typeNotif, userToken } from "./constantes";
import { jwtDecode } from "jwt-decode";

/**
 * Permet d'executer les requêtes axios et gerer d'eventuelles erreurs
 * @param {string} method (POST, DELETE, GET, PUT)
 * @param {string} endpoint contoller/action/role/:id
 * @param {object} data data 
 * @param {boolean} isHeaders specify if need headers 
 * @returns {array | null}
 */
export async function axiosRequest(method, endpoint, data, isHeaders=false){
    let url = `${routes.based_url}${endpoint}`;
    let token = localStorage.getItem(userToken);
    try{
        switch(method){
            case methods.get:
                return await axios.get(url, isHeaders && {headers: {"Authorization": "Bearer " + token}});
                break;
            case methods.post:
                return await axios.post(url, data, isHeaders && {headers: {"Authorization": "Bearer " + token}});
                break;
            case methods.put:
                return await axios.put(url, data, isHeaders && {headers: {"Authorization": "Bearer " + token}});
                break;
            case methods.del:
                return await axios.delete(url, isHeaders && {data: data, headers: {"Authorization": "Bearer " + token}});
                break;
        }
    }catch(err){
        // console.log(err);
        return null;
    }
}

/**
 * Check if an email is valide email
 * @param string $email
 * @returns boolean
 */
export function validateEmail(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
}

/**
 * Verify if a token is valid
 * @param string token 
 * @param string table (candidats or representants)
 * @returns boolean
 */
export function verifyToken(token, table){
    return axios
    .get(
        `${routes.based_url}${routes.users}${routes.verify}/${table}`,
        {headers: {"Authorization": "Bearer " + token}}
    )
    .then((resp) => {
        if(resp?.data){
            if(resp.status){
                return true;
            }else{
                localStorage.removeItem(userToken)
                return false;
            }
        }else{
            localStorage.removeItem(userToken)
            return false;
        } 
    })
    .catch((err) => false);
}

/**
 * Verifi si un champ est vide est rempli le message d'erreur correspondant à ce champ
 * @param function setFunc sms state set function
 * @param state obj user info state
 * @return void 
 */
export function setErrorSMSIfEmptyInput(setFunc, obj){
    let isFilled = false;
    for (let name in obj) {
        if (!obj[name] || obj[name] === "") {
            setFunc((prev) => ({
                ...prev,
                [name]: "Ce champ est obligatoire",
            }));
            isFilled = true;
        } else {
            setFunc((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    }

    return isFilled;
}

/**
 * Verifi si un champ est vide est rempli le message d'erreur correspondant à ce champ
 * @param {function} setFunc sms state set function
 * @param {state} obj current form state data
 * @param {array} fieldsName required fielname inside an array
 * @return {boolean} 
 */
export function errorOnEmptyFields(setFunc, obj, fieldsName)
{
    let isFilled = false;
    for(let attribut of fieldsName){
        if (!obj || !obj[attribut] || obj[attribut] === "") {
            setFunc((prev) => ({
                ...prev,
                [attribut]: "Ce champ est obligatoire",
            }));
            isFilled = true;
        } else {
            setFunc((prev) => ({
                ...prev,
                [attribut]: "",
            }));
        }
    }
    return isFilled;
}

export function removeSpace(data){
    let cleanedData = null;
    for (const [key, value] of Object.entries(data)) {
        if(typeof value === 'string')
            cleanedData = {...cleanedData,  [key]: value?.trim()};
        else cleanedData = {...cleanedData,  [key]: value};
    }
    return cleanedData;
}

/**
 * Check if input value from state is empty fill sms state error
 * @param event input event
 * @param function userFunc user state set function
 * @param function smsFunc sms state set function
 * @param array require required filed name
 * @return state obj user info state
 */
export function inputChange(event, userFunc, smsFunc, required=[]){
    const name = event.target.name;
    const value = event.target.value;
    userFunc((prev) => ({ ...prev, [name]: value.trim()==="" ? "" : value }));
    if (value.trim() === "" && required?.includes(name)) {
        smsFunc((prev) => ({
            ...prev,
            [name]: "Ce champ est obligatoire",
        }));
    } else {
        smsFunc((prev) => ({
            ...prev,
            [name]: "",
        }));
    }
}

/**
 * Return routes folder to build a url
 * @param string name experiences | compétences | formations | candidatures
 * @returns string
 */
export function returnRouteFolder(name){
    let routeFolder = routes.experiences;
    switch (name) {
        case dashboardName.competences:
            routeFolder = routes.competences;
            break;
        case dashboardName.formations:
            routeFolder = routes.formations;
            break;
        case dashboardName.candidatures:
            routeFolder = routes.candidatures;
            break;
        case recruteurDashboardName.offres:
            routeFolder = routes.offres;
            break;
        case actionsValues.addEntreprise:
            routeFolder = routes.entreprises
            break;
        case actionsValues.addCommunes:
            routeFolder = routes.communes
            break;
        case actionsValues.addContrat:
            routeFolder = routes.contrats
            break;
    }

    return routeFolder;
}

/**
 * Return an update id
 * @param string name experiences | compétences | formations | candidatures
 * @param object 
 * @returns object
 */
export function returnUpdateId(name, data){
    let returnId = 0;
    switch (name) {
        case dashboardName.experiences:
            returnId = {id_experiences: data?.id_experiences};
            break;
        case dashboardName.competences:
            returnId = {id_competences: data?.id_competences};
            break;
        case dashboardName.formations:
            returnId = {id_formations: data?.id_formations};
            break;
        case recruteurDashboardName.offres:
            returnId = {id_offres_demploi: data?.id_offres_demploi};
            break;
        case dashboardName.candidatures:
            returnId = {id_candidature: data?.id_candidature};
            break;
        case actionsValues.addEntreprise:
            returnId = {id_entreprises: data?.id_entreprises};
            break;
        case actionsValues.addCommunes:
            returnId = {id_communes: data?.id_communes};
            break;
        case actionsValues.addContrat:
            returnId = {id_types_decontrat: data?.id_types_decontrat};
            break;
    }

    return returnId;
}

export function updateStateOnDelete(state, func, id_attr, curr){
    let newState = state.filter(sta=>sta[id_attr]!==curr[id_attr]);
    func(newState);
}

export function dispatchNotification(data){
    const notifEvent = new CustomEvent("notification", {
        detail: data,
    });
    // Dispatch the event.
    window.dispatchEvent(notifEvent);
}

/**
 * redirect on token expirect and dispatch notification
 * @param {array} result 
 * @param {string} path
 * @param {function} navigate
 * @param {object} dispatchSucces
 * @param {object} dispatchFail
 * @return void
 */
export function redirectOnTokenFail(result, path, navigate, dispatchSucces=null, dispatchFail=null){
    let newPath = path;
    const token = localStorage.getItem(userToken);
    if (token) {
        const decoded = jwtDecode(token);
        if(decoded?.role){
            if(decoded?.role===tables.admin)
                newPath = menuPaths.connexionAdmin;
            if(decoded?.role===tables.representants)
                newPath = menuPaths.connexionRecruteur;
            if(decoded?.role===tables.candidats)
                newPath = menuPaths.connexionCandidat;
        }
    }
    if (!result){
        localStorage.removeItem(userToken);
        dispatchNotification({message: notifSms.session, type: typeNotif.fail})
        navigate(newPath);
        throw new Error("Votre session à expiré");
    }else if(!result?.status){
        if(dispatchFail) dispatchNotification(dispatchFail);
    }else{
        if(dispatchSucces) dispatchNotification(dispatchSucces);
    }
}

/**
 * Set loader to false
 * @param {function} setFunc 
 * @param {function} callBack
 */
export function stopLoader(setFunc, callBack=()=>{}){
    setTimeout(()=>{
        setFunc(false);
        if (typeof callBack === "function") callBack();
    }, 0);
}

/**
 * return message for success or fail on (add or modif) action
 * @param {boolean} isAddOnly 
 * @returns object {succes, fail}
 */
export function isAddOrUpdateNotif(isAddOnly){
    if (isAddOnly) {
        const succes = {
            message: notifSms.addSucces,
            type: typeNotif.succes,
        };
        const fail = {
            message: notifSms.addFail,
            type: typeNotif.fail,
        }
        return {succes, fail}
    } else {
        const succes = {
            message: notifSms.modifSucces,
            type: typeNotif.succes,
        };
        const fail = {
            message: notifSms.modifFail,
            type: typeNotif.fail,
        }
        return {succes, fail}
    }
}

/**
 * Recupère la liste des entreprises de la BD
 * @returns {array}
 */
export async function getAllEntreprises(table) {
    const data = await axiosRequest(
        methods.get,
        `${routes.entreprises}${routes.read_all}/${table}`,
        {},
        true
    );
    return data;
}

/**
 * Permet de verifier le format et la taille des fichiers pui redimensionner si c'est une image
 * @param {event} event from form field
 * @param {function} dataFunc set state function
 * @param {function} smsFunc setSms function
 * @param {function} blobFunc setBlob function
 * @param {function} imgFunc setImg function
 * @param {function} cvFileFunc setCvFile function
 * @returns 
 */
export function handleFile(event, dataFunc, smsFunc, blobFunc, imgFunc, cvFileFunc=null ) {
    const file = event.target.files[0];
    const name = event.target.name;

    if (!file) return;
    if (file.size > 500000) {
        smsFunc(prev =>({ ...prev, [name]: "Le fichier dépasse 500 Ko" }));
        return;
    }
    smsFunc(prev =>({ ...prev, [name]: "" }));
    // Pour le cv
    if (name === "cv") {
        if (file.type !== "application/pdf") {
            smsFunc(prev =>({ ...prev, [name]: "Sélectionner un fichier PDF" }));
            cvFileFunc(null);
            return;
        }

        cvFileFunc(file);
    }
    
    // Pour l'avatar ou le logo
    if (name === "avatar" || name === "logo") {
        const types = ["image/png", "image/jpeg", , "image/webp"];
        if (!types.includes(file.type)) {
            smsFunc(prev =>({ ...prev, [name]: "Format d'image incorrect" }));
            return;
        }

        smsFunc(prev =>({ ...prev, [name]: "" }));
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                // la largeur et la hauteur maximale
                const maxWidth = 200;
                const maxHeight = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height *= maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width *= maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Convertir le canvas en Blob
                canvas.toBlob(
                    (blob) => {
                        blobFunc(blob);
                        const url = URL.createObjectURL(blob);
                        dataFunc((prev) => ({
                            ...prev,
                            [name]: url,
                        }));
                        imgFunc(url);
                    },
                    "image/jpeg",
                    0.95
                );
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

/**
 * Build a formdata object (associate files and other data)
 * @param {object} data state
 * @param {object} resizedBlob
 * @param {string} name complementary file name
 * @param {string} ext file extension
 * @returns 
 */
export function buildFormdata(data, resizedBlob, name, ext){
    const formData = new FormData();
    for (let key in data) {
        // Ne pas ajouter l'url mit lors du chargement de l'image ou le cv s'il souhaite changer l'image
        if (key !== name && data[key])
            formData.append(key, data[key]);
    }
    // Si le blob exite alors on l'ajoute
    if (resizedBlob)
        formData.append(name, resizedBlob, name + "." + ext);

    return formData

}

/**
 * Ouvre sur un nouvel tab de l'offre selectionné
 * @param {object} curr selected offre data
 */
export const openOffreDetails = (curr) => {
    // On garde garde l'offre choisi dans localstorage pour pouvoir le recuperer ensuite dans Details
    localStorage.setItem(offreData, JSON.stringify(curr));
    window.open(menuPaths.offres + "/" + curr?.id_offres_demploi, "_blank");
};

/**
 * Ouvre sur un nouvel tab du candidat selectionné
 * @param {object} data selected candidat data
 */
export const openParcours = (data)=>{
    let url = `${menuPaths.docs}/${menuPaths.cv}/${data?.id_users}`;
    if (data?.cv) url = routes.based_url + data?.cv;

    window.open(url, "_blank");
}

export const openNewWin = (file)=>{
    let url = `${menuPaths.docs}/${file}`;
    window.open(url, "_blank");
}

/**
 * Eviter la duplication du siret ou d'une commune ou d'un type de contrat
 * @param {string} folder 
 * @param {object} data 
 * @param {function} navigate 
 * @returns 
 */
export async function veryExist(folder, data, navigate){
    let token = localStorage.getItem(userToken);
    let is_exist = null;
    if (!token) {
        redirectOnTokenFail(null, menuPaths.connexionRecruteur, navigate);
        return is_exist;
    }
    
    const decoded = jwtDecode(token);
   
    // On verifi si le token n'est plus valide
    let is_token = await verifyToken(token, decoded?.role);
    if (!is_token) {
        redirectOnTokenFail(null, menuPaths.connexionRecruteur, navigate);
        return is_exist;
    }else {
        // Verify if already apply
        is_exist = await axiosRequest(
            methods.post,
            `${folder}${routes.verify}/${decoded?.role}`,
            data,
            true
        );
    }

    return is_exist;
}

export function changeSousMenuPath(data, dashPath, decPath){
    let newData = {title: data?.title};
    if(data?.title===sousMenuNames.dashboard){
        newData.path= dashPath;
    }

    if(data?.title===sousMenuNames?.deconnexion){
        newData.path= decPath;
    }
    return newData
}

/**
 * Formate une date en mode français
 * @param {Date} dateString 
 * @returns 
 */
export function formatDate(dateString) {
    if(!dateString) return "";
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}