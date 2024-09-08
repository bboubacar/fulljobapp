const AddInput = ({
    label,
    onChange,
    name,
    value,
    sms = "",
    type = "text",
}) => {
    return (
        <label>
            {label}
            <div>{sms[name]}</div>
            <input
                type={type}
                name={name}
                onChange={onChange}
                value={value ? value : ""}
            />
        </label>
    );
};

export default AddInput;
