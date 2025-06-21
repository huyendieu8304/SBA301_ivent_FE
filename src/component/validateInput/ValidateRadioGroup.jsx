import {FormControl, FormControlLabel, FormHelperText, FormLabel} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from "react";

const ValidateRadioGroup = ({
                                fieldName,
                                label,
                                value, setValue, error, setError,
                                listOptions,
                                size = "medium",
                                isRequired = false,
                                validatorFunction,
                            }) => {

    const handleRadioChange = (e) => {
        setValue(fieldName, e.target.value);
    };

    const handleBlur = (e) => {
        const errorMsg = validatorFunction(e.target.value);
        setError(fieldName, errorMsg || "");
    };

    return (
        <FormControl error={!!error}>
            <FormLabel id="row-radio-buttons-group-label">
                {isRequired ? (
                    <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                ) : (
                    label
                )}
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="row-radio-buttons-group-label"
                name={fieldName}
                value={value}
                onChange={(e) => handleRadioChange(e)}
                onBlur={(e) => handleBlur(e)}
            >
                {listOptions.map((option) => (
                    <FormControlLabel value={option.value} key={option.value} control={<Radio size={size}/>} label={option.label}/>
                ))}
            </RadioGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
export default ValidateRadioGroup;