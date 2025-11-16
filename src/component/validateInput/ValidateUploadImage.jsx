import {Box, Button, FormHelperText, Stack, styled, Typography, useTheme} from "@mui/material";
import FileUpload from '@mui/icons-material/CloudUpload';
import React, {useEffect, useState} from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const ValidateUploadImage = ({
    label = "Upload Image",
    fieldName,
    value,
    setValue,
    error,
    setError,
    isRequired = false,
    isDisabled = false,
    validatorFunction
                                    }) => {

    const theme = useTheme();
    const [previewUrl, setPreviewUrl] = useState(value);

    useEffect(() => {
        if (typeof value === "string") {
            setPreviewUrl(value);
            return; // Không tạo object URL nếu là URL string
        }

        if (value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

        setPreviewUrl(null); // fallback nếu không phải string cũng không phải File
    }, [value]);

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const errorMsg = validatorFunction(file);
        setError(fieldName, errorMsg || "");
        setValue(fieldName, file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    return (
        <Box
            component="label"
            variant="contained"
            tabIndex={-1}
            width="100%"
            height="100%"
            sx={{
                backgroundColor: 'rgba(213,213,213,0.5)',
                border: "2px dashed",
                borderRadius: '8px',
                padding: '5px',
                // position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
            }}
        >

            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="preview"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: 8,
                    }}
                />
            ) : (
                <Stack
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >

                    <FileUpload sx={{
                        fontSize: '80px',
                        color: theme.palette.primary.main,
                    }}/>
                    <Typography
                        component="p"
                        sx={{color: theme.palette.primary.main, }}
                    >
                        {isRequired ? (
                            <span style={{color: "#027A48"}}>
                            {label} <span style={{color: "red"}}>*</span>
                        </span>
                        ) : (
                            label
                        )}
                    </Typography>
                </Stack>
            )}

            <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={isDisabled}
                // multiple
            />
            <FormHelperText error={!!error}>{error}</FormHelperText>
        </Box>
    )
}