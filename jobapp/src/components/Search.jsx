import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onChange, searchSub, error, data, isTitre = false }) => {
    let titre = data?.profession ? data?.profession : "";
    let commune = data?.commune ? data?.commune : "";
    if (isTitre) {
        titre = data?.titre ? data?.titre : "";
    }

    return (
        <div className="search-container" data-error={error}>
            <div className="search-input input-container">
                <input
                    type="text"
                    placeholder="métier"
                    aria-label="saisir un métier"
                    name={isTitre ? "titre" : "profession"}
                    value={titre}
                    onChange={onChange}
                />
            </div>
            <div className="location-input input-container">
                <input
                    type="text"
                    placeholder="saisir une ville"
                    aria-label="choisir une ville"
                    name="commune"
                    value={commune}
                    onChange={onChange}
                />
            </div>

            <div className="search-btn" onClick={searchSub}>
                <FaSearch />
                <span>Rechercher</span>
            </div>
        </div>
    );
};

export default Search;
