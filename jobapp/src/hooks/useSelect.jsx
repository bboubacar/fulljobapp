import React, { useState } from "react";

const useSelect = () => {
    const [selected, setSelected] = useState(null);
    const [isListOpen, setIsListeOpen] = useState(false);

    /**
     * Choix d'une option sur la iste
     * @param {DOMElement} ev
     * @param {Object} option
     * @return {*}
     */
    const selectedChange = (ev, option) => {
        try {
            setSelected(option);
            setIsListeOpen(false);
        } catch (err) {
            console.log("erreur ", err);
        }
    };

    // Ouverture du dropdown de selection de contrat
    const toggleDropdown = () => {
        setIsListeOpen(!isListOpen);
    };

    return {
        selected,
        isListOpen,
        toggleDropdown,
        selectedChange,
        setSelected,
    };
};

export default useSelect;
