import React from "react";
import Image from "./Image";

const Avatar = ({
    sms,
    userDetails,
    resizedImg,
    isOnEdit,
    handleFileUpload,
    attrImg = "avatar",
}) => {
    return (
        <div className="avatar edit-svg">
            <div>{sms?.[attrImg]}</div>
            <Image
                data={userDetails}
                resizedImg={resizedImg}
                attrImg={attrImg}
            />

            {isOnEdit && (
                <div className="select-avatar">
                    <label className="edit-avatar" htmlFor="avatar">
                        Choisir
                    </label>
                    <input
                        className="edit-avatar-input"
                        type="file"
                        name={attrImg}
                        aria-label="avatar"
                        id="avatar"
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </div>
            )}
        </div>
    );
};

export default Avatar;
