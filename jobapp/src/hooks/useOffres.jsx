import React, { useEffect, useRef, useState } from "react";
import { searchStore, typeContrat } from "../utilities/constantes";
import { axiosRequest } from "../utilities/functions";
import { methods, routes } from "../utilities/db_infos";
import { useSearch } from "./useSearch";

const useOffres = () => {
    const { searchChange, search, setSearch, error, setError } = useSearch();
    const [filtre, setFiltre] = useState({});
    const [offres, setOffres] = useState([]);
    const [storage, setStorage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownContrat, setDropdownContrat] = useState(false);
    const [currentContract, setCurrentContract] = useState(null);
    const rangeSal = useRef(null);

    const onReset = () => {
        localStorage.removeItem(searchStore);
        setSearch({});
        setFiltre({});
        setCurrentContract(null);
        setOffres([]);
    };

    useEffect(() => {
        // On recupère les fitres precedement effectués et stocker dans localStorage
        let preVal = localStorage.getItem(searchStore);
        if (!preVal || preVal === "null") return;

        preVal = JSON.parse(preVal);
        setSearch({ titre: preVal?.titre, commune: preVal?.commune });
        setFiltre((prev) => ({ ...prev, type: preVal?.type }));
        typeContrat.map((contr) => {
            if (contr.value === preVal?.type) setCurrentContract(contr);
        });

        setFiltre((prev) => ({
            ...prev,
            salaire_min: preVal?.salaire_min,
        }));
        setStorage(preVal);
    }, []);

    // Dès que les données du localstorage seront charger alors il fait la recherche
    useEffect(() => {
        if (storage) searchSub();
    }, [storage]);

    // Ouvrir le Dropodwn menu
    const toggleContrat = (ev, option) => {
        if (option && dropdownContrat) {
            setFiltre((prev) => ({ ...prev, type: option?.value }));
            setCurrentContract(option);
        }
        setDropdownContrat(!dropdownContrat);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFiltre((prev) => ({ ...prev, [name]: value }));
    };

    const searchSub = async () => {
        if (!search || !search?.titre) {
            if (!search.titre) setError("Veuillez saisir un métier");
            return;
        }
        setIsLoading(true);

        // On combine let filtre le contenu de seauch
        const newSearch = search;
        Object.assign(newSearch, filtre);

        const result = await axiosRequest(
            methods.post,
            `${routes.offres}${routes.search}`,
            newSearch,
            true
        );

        setTimeout(() => {
            setIsLoading(false);
            setOffres(result?.data?.data);
            // On garde dans local strorage les critères de recherche pour les recuprerer en cas de retour sur la page
            localStorage.setItem(searchStore, JSON.stringify(newSearch));
        }, 1000);
    };

    return {
        searchSub,
        handleChange,
        toggleContrat,
        searchChange,
        error,
        offres,
        isLoading,
        currentContract,
        rangeSal,
        search,
        dropdownContrat,
        filtre,
        onReset,
    };
};

export default useOffres;
