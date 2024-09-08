import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    axiosRequest,
    inputChange,
    setErrorSMSIfEmptyInput,
    validateEmail,
} from "../utilities/functions";
import { menuPaths, userToken, fromOffre } from "../utilities/constantes";
import { methods, routes, tables } from "../utilities/db_infos";
import { changeSousMenu } from "../redux/sousMenuSlice";
import { useDispatch } from "react-redux";

/**
 * Hook personnalisé pour la connection des utilisateurs (candidats ou representants)
 * @param {string} table
 * @returns {object}
 */
const userConnection = (table) => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [sms, setSms] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Si un des champs est vide
            const isEmpty = setErrorSMSIfEmptyInput(setSms, user);
            if (isEmpty) return;

            if (!validateEmail(user.email)) {
                setSms({ email: "Format d'adresse mail invalid" });
                return;
            }

            setIsLoading(true);
            // get a token if data are correct
            let token = await axiosRequest(
                methods.post,
                `${routes.users}${routes.getToken}/${table}`,
                user
            );
            if (!token) setSms({ err: "Vos identifiants sont incorrect" });
            else {
                // On met le token dans le localStorage avec la clé "token"
                localStorage.setItem(userToken, token?.data?.data?.token);
                dispatch(changeSousMenu());
                if (table === tables.representants)
                    navigate(menuPaths.recruteur);
                if (table === tables.admin) navigate(menuPaths.admin);
                else if (table === tables.candidats) {
                    // On verifi si le candidat voulais postuler pour une offre
                    let isOffre = localStorage.getItem(fromOffre);
                    if (isOffre) {
                        localStorage.removeItem(fromOffre);
                        // redirige vers l'offre au lieu du dashboard
                        navigate(isOffre);
                    } else navigate(menuPaths.candidat);
                }
            }
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setIsLoading(false);
            console.log("erreur ", err);
        }
    };

    const handleChange = (event) => {
        try {
            inputChange(event, setUser, setSms);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    return { sms, isLoading, handleChange, handleSubmit };
};

export default userConnection;
