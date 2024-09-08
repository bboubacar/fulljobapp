const EditCommunes = ({
    selectedCom,
    communes,
    communeChange,
    isOnEdit,
    selectCommune,
    isSelOpen,
}) => {
    return (
        <>
            {isOnEdit ? (
                <div className="select-options">
                    <div htmlFor="select-options">Commune</div>
                    <div
                        className="select"
                        onClick={selectCommune}
                        id="select-options"
                    >
                        {selectedCom ? selectedCom.commune : "selectionnez"}
                    </div>
                    <div
                        className={
                            isSelOpen
                                ? "select-container open-options"
                                : "select-container"
                        }
                    >
                        {communes?.map((com) =>
                            selectedCom?.commune !== com.commune ? (
                                <span
                                    className="option"
                                    key={com.code_postale}
                                    onClick={(event) =>
                                        communeChange(event, com)
                                    }
                                >
                                    {com?.commune}
                                </span>
                            ) : (
                                ""
                            )
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        {selectedCom
                            ? selectedCom?.code_postale
                            : "Code postal"}
                    </div>
                    <div>{selectedCom ? selectedCom?.commune : "Commune"}</div>
                </>
            )}
        </>
    );
};

export default EditCommunes;
