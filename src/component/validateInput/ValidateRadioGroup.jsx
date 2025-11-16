import {FormControl, FormControlLabel, FormHelperText, FormLabel} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, {useEffect} from "react";

const ValidateRadioGroup = ({
                                fieldName,
                                label,
                                value, setValue, error, setError,
                                listOptions,
                                size = "medium",
                                isRequired = false,
                                isDisabled = false,
                                validatorFunction,
                                defaultValue = null
                            }) => {

    useEffect(() => {
        if ((value === undefined || value === "") && defaultValue !== undefined) {
            setValue(fieldName, defaultValue);
        }
    }, [defaultValue]);

    const handleRadioChange = (e) => {
        let rawValue = e.target.value;
        let parsedValue;
        if (rawValue === "true") {
            parsedValue = true;
        } else if (rawValue === "false") {
            parsedValue = false;
        } else {
            parsedValue = rawValue;
        }

        setValue(fieldName, parsedValue);
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
                    <FormControlLabel
                        value={option.value}
                        key={option.value}
                        control={<Radio
                            disabled={isDisabled}
                            size={size}/>
                        }
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
}
export default ValidateRadioGroup;