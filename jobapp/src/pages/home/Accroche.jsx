import React from "react";
import Search from "../../components/Search";
import { useSearch } from "../../hooks/useSearch";
import { menuPaths, searchStore } from "../../utilities/constantes";
import { useNavigate } from "react-router-dom";

const Accroche = () => {
    const { searchChange, search } = useSearch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (search?.titre || search?.commune)
            localStorage.setItem(searchStore, JSON.stringify(search));

        navigate(menuPaths.offres);
    };

    return (
        <section className="accroche">
            <article className="accroche-container">
                <h1>OFFRES D'EMPLOIS IDEALES</h1>
                <Search
                    onChange={searchChange}
                    searchSub={handleSubmit}
                    error={""}
                    data={search}
                    isTitre={true}
                />
            </article>
        </section>
    );
};

export default Accroche;
