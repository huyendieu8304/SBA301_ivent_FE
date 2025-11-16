import {TextField} from "@mui/material";

const ValidationTextField = ({
                                 label,
                                 fieldName,
                                 value,
                                 setValue,
                                 error,
                                 setError,
                                 isRequired = false,
                                 isDisabled = false,
                                 size = "medium",
                                 type = "text",
                                 validatorFunction = (e) => {""},
                                sx,
                             }) => {
    const handleChange = (e) => {
        setValue(fieldName, e.target.value);
    };

    const handleBlur = (e) => {
        let errorMsg;
        errorMsg = validatorFunction(e.target.value);
        setError(fieldName, errorMsg || "");
    };

    return (
        <TextField
            fullWidth
            disabled={isDisabled}
            label={
                isRequired ? (
                    <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                ) : (
                    label
                )
            }
            type={type}
            value={value}
            size={size}
            onChange={(e) => handleChange(e)}
            error={!!error}
            helperText={error}
            onBlur={(e) => handleBlur(e)}
            sx={sx}
        />
    )
}
export default ValidationTextField;