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
                                 type = "number",
                                 validatorFunction = (e) => {""},
                                minValue = 0,
                                maxValue = 100000,
                                sx,
                                onChange,
                             }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        let newValue = Number(value);
        if (newValue < minValue) {
            newValue = minValue;
        }
        if (value > maxValue) {
            newValue = maxValue;
        }

        setValue(fieldName, newValue);
    };

    const handleBlur = (e) => {
        let errorMsg;
        errorMsg = validatorFunction( e.target.value);
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