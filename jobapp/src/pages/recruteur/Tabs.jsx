import React from "react";
import { recruteurDashboardTab } from "../../utilities/constantes";

const Tabs = ({ activeTab, toggleTab }) => {
    return (
        <div className="main-tabs">
            {recruteurDashboardTab.map((element, idx) => (
                <TabItem
                    key={element.name + idx}
                    element={element}
                    toggleTab={toggleTab}
                    activeTab={activeTab}
                    idx={idx}
                />
            ))}
        </div>
    );
};

const TabItem = ({ element, idx, toggleTab, activeTab }) => {
    return (
        <div
            onClick={() => toggleTab(element, idx)}
            className={
                activeTab === idx
                    ? "tab-" + element.name + " active-tab"
                    : "tab-" + element.name
            }
        >
            {element.title}
        </div>
    );
};

export default Tabs;
