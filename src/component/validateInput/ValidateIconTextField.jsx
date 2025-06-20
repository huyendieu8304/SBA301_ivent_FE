import {useRef, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ValidatedIconTextField = ({
                                    label,
                                    fieldName,
                                    value,
                                    setValue,
                                    error,
                                    setError,
                                    isRequired = false,
                                    size = "medium",
                                    type = "text",
                                    validatorFunction,
                                    relatedValue = null, isRePasswordInput = false,
                                    startIcon = null,
                                    endIcon = VisibilityIcon,
                                }) => {
    const [endIconCurrent, setEndIconCurrent] = useState(endIcon);
    const [typeInputCurrent, setTypeInputCurrent] = useState(type);
    const [shrink, setShrink] = useState(false);
    const inputRef = useRef();

    const handleChange = (e) => {
        setValue(fieldName, e.target.value);
    };

    const handleBlur = (e) => {
        let errorMsg;
        if (isRePasswordInput) {
            errorMsg = validatorFunction(e.target.value, relatedValue);
        } else {
            errorMsg = validatorFunction(e.target.value);
        }
        setError(fieldName, errorMsg || "");
    };

    const handleChangeTypeInput = () => {
        const position = inputRef.current.selectionStart;
        if (typeInputCurrent === "password") {
            setTypeInputCurrent("text");
            setEndIconCurrent(<VisibilityIcon/>);
        }
        if (type === "password" && typeInputCurrent !== "password") {
            setTypeInputCurrent("password");
            setEndIconCurrent(endIcon);
        }
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                inputRef.current.setSelectionRange(position, position);
            }
        }, 0);
    };

    return (
        <TextField
            inputRef={inputRef}
            name={fieldName}
            fullWidth
            label={
                isRequired ? (
                    <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                ) : (
                    label
                )
            }
            type={typeInputCurrent}
            value={value}
            size={size}
            onChange={(e) => handleChange(e)}
            error={!!error}
            helperText={error}
            slotProps={{
                input: {
                    ...(startIcon && {
                        startAdornment: (
                            <InputAdornment position="start">
                                {startIcon}
                            </InputAdornment>
                        )
                    }),
                    ...(endIcon && {
                        endAdornment: (
                            <InputAdornment position="end">
                                {type === "password" ? (
                                    <IconButton
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={handleChangeTypeInput}
                                    >
                                        {endIconCurrent}
                                    </IconButton>
                                ) : (
                                    endIconCurrent
                                )}
                            </InputAdornment>
                        ),
                    }),
                },
                inputLabel: { shrink },
            }}
            onFocus={() => setShrink(true)}
            onBlur={(e) => {
                !e.target.value && setShrink(false);
                handleBlur(e);
            }}
        />
    )
}

export default ValidatedIconTextField;