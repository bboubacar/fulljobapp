import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { typeContrat } from "../../utilities/constantes";
import Search from "../../components/Search";
import Offre from "./Offre";
import { ImSpinner9 } from "react-icons/im";
import useOffres from "../../hooks/useOffres";
import { v4 as uuidv4 } from "uuid";
import usePageTitle from "../../hooks/usePageTitle";

const salaire = "salaire_min";
const Offres = () => {
    const {
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
    } = useOffres();
    usePageTitle("Offres");
    return (
        <section className="listes-offres">
            <article className="filtres">
                <span className="reset" onClick={onReset}>
                    Reinitiliser
                </span>
                <Itemcontainer
                    title="Contrat"
                    toggleDropdown={toggleContrat}
                    toggleState={dropdownContrat}
                    current={currentContract}
                >
                    <DropdownElement
                        options={typeContrat}
                        onSelect={toggleContrat}
                    />
                </Itemcontainer>

                <Range
                    refItem={rangeSal}
                    handleChange={handleChange}
                    rangeValue={filtre?.salaire_min}
                    title="Salaire minimum"
                    name={salaire}
                    max="3000"
                    step="50"
                    unity="€"
                />
            </article>
            <article className="search-results">
                <Search
                    onChange={searchChange}
                    searchSub={searchSub}
                    error={error}
                    data={search}
                    isTitre={true}
                />

                <div className="results">
                    <div className="result-nbre">{offres?.length} Offres</div>
                    {isLoading ? (
                        <div className="loading-container">
                            <ImSpinner9 />
                        </div>
                    ) : (
                        offres?.map((offre) => (
                            <Offre offre={offre} key={uuidv4()} />
                        ))
                    )}
                </div>
            </article>
        </section>
    );
};

const Itemcontainer = ({
    children,
    title,
    toggleDropdown,
    toggleState,
    current,
}) => {
    return (
        <div className="filtres-liste">
            <div className="select-container">
                <span className="title">{title}</span>
                <div className="type" onClick={toggleDropdown} id="type">
                    <span>
                        {current && current?.title !== ""
                            ? current?.title
                            : "selectionnez"}
                    </span>
                    {toggleState ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </div>
                <div
                    className={
                        toggleState
                            ? "dropdown-container open-dropdown"
                            : "dropdown-container"
                    }
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

const DropdownElement = ({ options, onSelect }) => {
    return (
        <>
            {options.map((option) => (
                <div
                    className="option"
                    key={option.value}
                    onClick={(event) => onSelect(event, option)}
                >
                    {option.title}
                </div>
            ))}
        </>
    );
};

const Range = ({
    refItem,
    handleChange,
    rangeValue,
    title,
    name,
    max,
    step,
    unity,
}) => {
    return (
        <div className="range-wrap">
            <div className="range-value" id="rangeV" ref={refItem}>
                <span>
                    {rangeValue ? rangeValue : 0}
                    {unity}
                </span>
            </div>
            <label htmlFor="min">{title}</label>
            <input
                id="min"
                aria-label="choisir un salaire minimum"
                type="range"
                max={max}
                step={step}
                name={name}
                value={rangeValue ? rangeValue : 0}
                onChange={handleChange}
            />
        </div>
    );
};

export default Offres;
