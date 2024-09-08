import React from "react";
import { dashboardTab } from "../../utilities/constantes";

const Tabs = ({ activeTab, toggleTab }) => {
    return (
        <div className="main-tabs">
            {dashboardTab.map((element, idx) => (
                <div
                    key={element.name + idx}
                    onClick={() => toggleTab(element, idx)}
                    className={
                        activeTab === idx
                            ? "tab-" + element.name + " active-tab"
                            : "tab-" + element.name
                    }
                >
                    {element.title}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
