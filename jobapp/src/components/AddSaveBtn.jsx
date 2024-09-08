import React from "react";
import { FiSave } from "react-icons/fi";
import { GrAdd, GrClose } from "react-icons/gr";

const AddSaveBtn = ({ isOnAdd, cancel, onSubmit, openAdd }) => {
    return (
        <div className="add-new">
            {isOnAdd ? (
                <>
                    <GrClose onClick={cancel} /> <FiSave onClick={onSubmit} />{" "}
                </>
            ) : (
                <GrAdd onClick={openAdd} />
            )}
        </div>
    );
};

export default AddSaveBtn;
