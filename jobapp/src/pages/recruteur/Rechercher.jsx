import React from "react";
import Search from "../../components/Search";
import { ImSpinner9 } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";
import { useSearch } from "../../hooks/useSearch";
import { openParcours } from "../../utilities/functions";

const Rechercher = () => {
    const { searchChange, search, searchSub, searRes, seaLoader, error } =
        useSearch();
    return (
        <div className="recherche-candidats">
            <Search
                onChange={searchChange}
                searchSub={searchSub}
                error={error}
                data={search}
            />
            <Result results={searRes} seaLoader={seaLoader} />
        </div>
    );
};

const Result = ({ results, seaLoader }) => {
    return (
        <div className="search-result">
            {!seaLoader ? (
                <div className="result-count">
                    <h1>{results?.length} Candidats</h1>
                </div>
            ) : (
                <div className="loading-container">
                    <ImSpinner9 />
                </div>
            )}
            <div className="items">
                {results?.map((res) => (
                    <div className="item" key={uuidv4()}>
                        <h2>
                            {res?.prenom} {res.nom}
                        </h2>
                        <div>{res?.profession}</div>
                        <div className="adress">Adresse: {res.commune}</div>
                        <div className="submit-btns">
                            <div
                                className="parcours"
                                onClick={(ev) => openParcours(res)}
                            >
                                Parcours
                            </div>
                            <div className="contacter">Contacter</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rechercher;
