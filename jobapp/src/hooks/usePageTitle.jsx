import React, { useEffect } from "react";

const usePageTitle = (pageTitle) => {
    useEffect(() => {
        const baseTitle = "Emploi Idéal : Trouvez votre job parfait";
        document.title = `${pageTitle} - ${baseTitle}`;
    }, [pageTitle]);
};

export default usePageTitle;
