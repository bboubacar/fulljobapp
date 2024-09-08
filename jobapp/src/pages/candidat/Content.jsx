import React from "react";
import TabsContents from "./TabsContents";
import Tabs from "./Tabs";
import useContent from "../../hooks/useContent";

const Content = () => {
    const { toggleTab, getData, activeTab, dashContent, pageLoading } =
        useContent();

    return (
        <article className="contents">
            <Tabs activeTab={activeTab} toggleTab={toggleTab} />
            <TabsContents
                dashContent={dashContent}
                updateState={getData}
                pageLoading={pageLoading}
            />
        </article>
    );
};

export default Content;
