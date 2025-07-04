import {TextField} from "@mui/material";

const ValidateNumberField = ({
                                 isRequired = false,
                                 label,
                                 fieldName,
                                 value,
                                 setValue,
                                 error,
                                 setError,
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
        //kiểm soát min max
        if (newValue < minValue) {
            newValue = minValue;
        }
        if (value > maxValue) {
            newValue = maxValue;
        }

        //nếu có truyền vào onchange riêng
        if(onChange) {
            onChange(newValue);
            return;
        }

        setValue(fieldName, newValue);
    };

    const handleBlur = (e) => {
        const value = e.target.value;
        let newValue = Number(value);

        //nếu có truyền vào onchange riêng
        if(onChange) {
            onChange(newValue);
            return;
        }

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
export default ValidateNumberField;