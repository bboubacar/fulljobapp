import { useState } from "react";
import { methods, routes, tables } from "../utilities/db_infos";
import { axiosRequest, redirectOnTokenFail } from "../utilities/functions";
import { menuPaths } from "../utilities/constantes";
import { useNavigate } from "react-router-dom";

export const useSearch = (defaultData = null) => {
    const [search, setSearch] = useState({});
    const [searRes, setSeaRes] = useState([]);
    const [seaLoader, setSeaLoader] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const searchChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (value === "" && (name === "titre" || name === "profession"))
            setError("Veuillez saisir un métier");
        else setError("");

        setSearch((prev) => ({ ...prev, [name]: value }));
    };

    const searchSub = async () => {
        // Si recherche en cours ou le champs profession n'existe pas ne fait rien
        if (seaLoader | !search?.profession) {
            if (!search?.profession) setError("Veuillez saisir un métier");
            return;
        }

        setSeaLoader(true);

        const result = await axiosRequest(
            methods.post,
            `${routes.users}${routes.search}/${tables.representants}`,
            search,
            true
        );

        redirectOnTokenFail(
            result?.data,
            menuPaths.connexionRecruteur,
            navigate
        );
        setTimeout(() => {
            setSeaRes(result?.data?.data);
            setSeaLoader(false);
        }, 1000);
    };

    return {
        searchChange,
        searchSub,
        searRes,
        setSeaRes,
        seaLoader,
        search,
        error,
        setError,
        setSearch,
    };
};
