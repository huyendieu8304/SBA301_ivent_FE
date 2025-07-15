import {FormHelperText, Typography} from "@mui/material";
import RichTextComponent from "../richTextEditor/RichTextComponent.jsx";
import React, { useRef} from "react";

const ValidateRichTextEditor = ({
                                    label,
                                    fieldName,
                                    value,
                                    error,
                                    setValue,
                                    setError,
                                    validatorFunction,
                                    isRequired = false,
                                    isDisabled = false,
                                }) => {

    const richTextRef = useRef();

    const handleDebouncedChange = (data) => {
        setValue(fieldName, data.html);
        let errorMsg = validatorFunction(data.text.replace(/\n$/, ""));
        setError(fieldName, errorMsg || "");
    };

    return (
        <>
            <Typography ml={2}>
                {isRequired ? (
                    <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                ) : (
                    label
                )}
            </Typography>
            <RichTextComponent
                ref={richTextRef}
                onChangeDebounced={handleDebouncedChange}
                value={value}
                isDisabled={isDisabled}
            />
            <FormHelperText sx={{
                color: "#d32f2f",
                marginLeft: "10px"
            }}>
                {error}
            </FormHelperText>
        </>
    );
}
export default ValidateRichTextEditor;