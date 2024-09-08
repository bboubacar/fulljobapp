import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/confirmSlice";
import { BsThreeDots } from "react-icons/bs";

const EditDeleteItem = ({ openEdit, content, onDelete, text }) => {
    const [isMenu, setIsMenu] = useState(false);
    const dispatch = useDispatch();

    const toggleMenu = () => {
        setIsMenu(!isMenu);
    };

    const openEditForm = (content) => {
        setIsMenu(false);
        openEdit(content);
    };

    const deleteItem = (content) => {
        setIsMenu(false);
        onDelete(content);
    };
    return (
        <>
            <div className="edit-dots" onClick={toggleMenu}>
                <BsThreeDots />
            </div>
            <div
                className={
                    isMenu ? "edit-delete open-edit-delete" : "edit-delete"
                }
            >
                <span onClick={(event) => openEditForm(content)}>edit</span>
                <span
                    onClick={() =>
                        dispatch(
                            openModal({
                                text: text,
                                func: () => deleteItem(content),
                            })
                        )
                    }
                >
                    delete
                </span>
            </div>
        </>
    );
};

export default EditDeleteItem;
