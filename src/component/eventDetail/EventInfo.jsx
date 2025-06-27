import Box from "@mui/material/Box";
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import { checkInputStringLength, checkRequiredInput} from "../../common/ValidateFunction.jsx";
import {useEffect, useState} from "react";
import ValidateRadioGroup from "../validateInput/ValidateRadioGroup.jsx";
import AddressData  from "../../AddressData.js";
import ValidateSelect from "../validateInput/ValidateSelect.jsx";
import {Stack} from "@mui/material";

const PROVINCE_LIST = AddressData.map(
    (item, index) => ({
        id: index,
        value: item.province,
        label: item.province
    }));

function EventInfo({ formFields, setFormFields}) {

    const [wardList, setWardList] = useState([]);

    //change wardlist when the province change
    useEffect(() => {
        setFormFields(prevState => ({
            ...prevState,
            ward: {
                ...prevState.ward,
                value: "",
                error: "",
            }
        }));
        if (!formFields.province.value) {
            setWardList([]); // Không có tỉnh thì không có phường
            return;
        }

        const selectedProvince = AddressData.find(
            (item) => item.province === formFields.province.value
        );

        if (selectedProvince) {
            setWardList(selectedProvince.wards.map((item, index) => ({
                        id: index,
                        value: item,
                        label: item
                    })
                )
            );
        } else {
            setWardList([]); // Tỉnh không tìm thấy trong danh sách
        }
    }, [formFields.province.value])

    // validate field
    const validateEventName = (value) => {
        const fieldName = formFields.name.label;
        const error = checkRequiredInput(fieldName, value) || checkInputStringLength(value, fieldName, 200);
        if (error) {
            return error;
        }
        return null;
    }

    const validateEventType = (value) => {
        const fieldName = formFields.isOnline.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateEventProvince = (value) => {
        const fieldName = formFields.province.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }
    const validateEventWard = (value) => {
        const fieldName = formFields.ward.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateEventLocation= (value) => {
        const fieldName = formFields.location.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    //common update field value and error
    const updateField = (fieldName, newValue) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                value: newValue,
            },
        }));
    };

    const updateError = (fieldName, errorMsg) => {
        setFormFields((prev) => ({
            ...prev,
            [fieldName]: {
                ...prev[fieldName],
                error: errorMsg,
            },
        }));
    };
    return (
        <Box sx={{
            marginTop: '20px',
        }}>
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                {/*todo; anh su kien chua co*/}
                <ValidationTextField
                    label={formFields.name.label}
                    fieldName="name"
                    value={formFields.name.value}
                    error={formFields.name.error}
                    validatorFunction={validateEventName}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    type="text"
                />
            </Box>
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                <ValidateRadioGroup
                    label={formFields.isOnline.label}
                    fieldName="isOnline"
                    value={formFields.isOnline.value}
                    error={formFields.isOnline.error}
                    validatorFunction={validateEventType}
                    setValue={updateField}
                    setError={updateError}
                    listOptions={[
                        {value: false, label: "Sự kiện Offline"},
                        {value: true, label: "Sự kiện Online"},
                    ]}
                    size="medium"
                    isRequired={true}
                />


                {/*todo: Address*/}

                <Stack direction={'row'} spacing={2} mb={1}>
                    <ValidateSelect
                        label={formFields.province.label}
                        fieldName="province"
                        value={formFields.province.value}
                        error={formFields.province.error}
                        validatorFunction={validateEventProvince}
                        setValue={updateField}
                        setError={updateError}
                        listOptions={PROVINCE_LIST}
                        isRequired={true}
                    />
                    <ValidateSelect
                        label={formFields.ward.label}
                        fieldName="ward"
                        value={formFields.ward.value}
                        error={formFields.ward.error}
                        validatorFunction={validateEventWard}
                        setValue={updateField}
                        setError={updateError}
                        listOptions={wardList}
                        isRequired={true}
                    />
                </Stack>
                <ValidationTextField
                    label={formFields.location.label}
                    fieldName="location"
                    value={formFields.location.value}
                    error={formFields.location.error}
                    validatorFunction={validateEventLocation}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    type="text"
                />

            </Box>
            {/*category*/}
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >

            </Box>
            {/*description*/}
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >

            </Box>
            {/*organizer*/}
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >

            </Box>
        </Box>
    );
}

export default EventInfo;