import React from "react";
import { v4 as uuidv4 } from "uuid";
import EditDeleteItem from "../../components/EditDeleteItem";
import AddInput from "../../components/AddInput";
import AddSaveBtn from "../../components/AddSaveBtn";
import useHandleForm from "../../hooks/useHandleForm";

const Communes = ({ communes, setIsLoading, updatePageContent, onContent }) => {
    const requiredFields = ["code_postale", "commune"];
    const {
        handleSub,
        handleChange,
        cancel,
        openEdit,
        openAdd,
        modifData,
        isOnAdd,
        sms,
        setSms,
        onDelete,
    } = useHandleForm(
        requiredFields,
        setIsLoading,
        updatePageContent,
        onContent
    );

    if (sms?.already) {
        setSms({ code_postale: "Ce code postale est déjà enregistré" });
    }

    return (
        <div className="communes">
            <AddSaveBtn
                isOnAdd={isOnAdd}
                cancel={cancel}
                onSubmit={handleSub}
                openAdd={openAdd}
            />
            <AddCommunes
                isOnAdd={isOnAdd}
                data={modifData}
                handleChange={handleChange}
                sms={sms}
            />
            <div className="items">
                {communes?.map((commune) => (
                    <div className="item" key={uuidv4()}>
                        <EditDeleteItem
                            openEdit={openEdit}
                            onDelete={onDelete}
                            content={commune}
                            text="La suppression de la commune"
                        />
                        <div>
                            <strong>Code postale: </strong>
                            {commune?.code_postale}
                        </div>
                        <div>
                            <strong>Commune: </strong>
                            {commune?.commune}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AddCommunes = ({ isOnAdd, data, sms, handleChange }) => {
    return (
        <div className={isOnAdd ? "add-dash-form open-form" : "add-dash-form"}>
            <AddInput
                label="Code postale"
                name="code_postale"
                value={data?.code_postale ? data?.code_postale : ""}
                sms={sms}
                onChange={handleChange}
            />
            <AddInput
                label="Commune"
                name="commune"
                value={data?.commune ? data?.commune : ""}
                sms={sms}
                onChange={handleChange}
            />
        </div>
    );
};

export default Communes;
