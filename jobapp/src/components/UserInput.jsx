const UserInput = ({
    name,
    pholder,
    label,
    type = "text",
    handleChange,
    message,
    icon = "",
}) => {
    return (
        <div className={`${name}-input input-container`}>
            <label htmlFor={name}>
                <span>{pholder}</span>
                <span>{message}</span>
            </label>
            <div htmlFor={name}>
                <input
                    id={name}
                    type={type}
                    placeholder={pholder}
                    aria-label={label}
                    name={name}
                    onChange={handleChange}
                />
                {icon ? (
                    <div className="login-input-btn input-btn">{icon}</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default UserInput;
