import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

function ValidateSelect({
                            fieldName,
                            label,
                            value,
                            setValue,
                            error,
                            setError,
                            listOptions,
                            size = "small",
                            isRequired = false,
                            validatorFunction,
                        }) {

    const handleChange = (e) => {
        setValue(fieldName, e.target.value);
    }

    const handleBlur = (e) => {
        const errorMsg = validatorFunction(e.target.value);
        setError(fieldName, errorMsg ||"");
    }

    return (
        <FormControl error={!!error} fullWidth>
            <InputLabel>
                {isRequired ? (
                    <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                ) : (
                    label
                )}
            </InputLabel>
            <Select
                // variant="standard"
                value={value}
                label={label}
                onChange={e => handleChange(e)}
                onBlur={e => handleBlur(e)}
            >
                {listOptions.map((option) => (
                    <MenuItem value={option.value} key={option.id}>{option.label}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    );
}

export default ValidateSelect;