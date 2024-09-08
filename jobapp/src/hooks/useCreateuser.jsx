import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    axiosRequest,
    inputChange,
    setErrorSMSIfEmptyInput,
    validateEmail,
    verifyToken,
} from "../utilities/functions";
import { methods, routes, tables } from "../utilities/db_infos";
import { menuPaths, userToken } from "../utilities/constantes";

const useCreateuser = (table) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        rpwd: "",
    });
    const [sms, setSms] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        try {
            inputChange(event, setUser, setSms);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    // useEffect(() => {
    //     try {
    //         let token = localStorage.getItem(userToken);
    //         const verify = async () => {
    //             let is_token = await verifyToken(token);
    //             if (is_token) {
    //                 if (table === tables.representants)
    //                     navigate(menuPaths.recruteur);
    //                 else if (table === tables.candidats)
    //                     navigate(menuPaths.candidat);
    //             }
    //         };
    //         verify();
    //     } catch (err) {
    //         console.log("erreur ", err);
    //     }
    // }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Si un des champs est vide
            const isEmpty = setErrorSMSIfEmptyInput(setSms, user);
            if (isEmpty) return;

            if (!validateEmail(user.email)) {
                setSms({ email: "Format d'adresse email invalid" });
            } else {
                if (user.password !== user.rpwd) {
                    setSms({ rpwd: "Mot de passe ne correspond pas" });
                } else {
                    setIsLoading(true);

                    // Verify is email is already used
                    let emailAva = await axiosRequest(
                        methods.post,
                        `${routes.users}${routes.verify_email}/${table}`,
                        { email: user.email }
                    );

                    if (emailAva) {
                        // Create new user
                        let result = await axiosRequest(
                            methods.post,
                            `${routes.users}${routes.createUser}/${table}`,
                            user
                        );
                        if (result?.data?.status) {
                            table === tables.representants
                                ? navigate(menuPaths.congrat2)
                                : navigate(menuPaths.congrat);
                        } else {
                            setSms({
                                serverErr: "Erreur d'ouverture du compte",
                            });
                        }
                    } else setSms({ email: "Adresse email indisponble" });

                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }
            }
        } catch (err) {
            setIsLoading(false);
            console.log("erreur ", err);
        }
    };

    return { sms, isLoading, handleChange, handleSubmit };
};

export default useCreateuser;
