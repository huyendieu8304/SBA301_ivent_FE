import Box from "@mui/material/Box";
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import {
    checkDateAfter,
    checkDateBefore,
    checkStringMaxLength,
    checkRequiredInput,
    checkUploadImage,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import React, {useEffect, useRef, useState} from "react";
import ValidateRadioGroup from "../validateInput/ValidateRadioGroup.jsx";
import AddressData  from "../../AddressData.js";
import ValidateSelect from "../validateInput/ValidateSelect.jsx";
import {InputLabel, Stack} from "@mui/material";
import ValidateRichTextEditor from "../validateInput/ValidateRichTextEditor.jsx";
import { DATETIME_FORMAT} from "../../common/Constant.jsx";
import {ValidateDateTimePicker} from "../validateInput/ValidateDateTimePicker.jsx";
import {ValidateUploadImage} from "../validateInput/ValidateUploadImage.jsx";

const PROVINCE_LIST = AddressData.map(
    (item, index) => ({
        id: index,
        value: item.province,
        label: item.province
    }));

const DEFAULT_DESCRIPTION = "<p><strong>Giới\n" +
    "    thiệu sự kiện:</strong></p><p>[Tóm tắt ngắn gọn về sự kiện: Nội dung chính của sự kiện, điểm đặc sắc nhất và lý do\n" +
    "    khiến người tham gia không nên bỏ lỡ]</p><p><strong>Chi tiết sự kiện:</strong></p>\n" +
    "<ul>\n" +
    "    <li><strong>Chương trình chính:</strong> [Liệt kê những hoạt động nổi bật trong sự kiện: các phần trình diễn, khách\n" +
    "        mời đặc biệt, lịch trình các tiết mục cụ thể nếu có.]\n" +
    "    </li>\n" +
    "    <li><strong>Khách mời:</strong> [Thông tin về các khách mời đặc biệt, nghệ sĩ, diễn giả sẽ tham gia sự kiện. Có thể\n" +
    "        bao gồm phần mô tả ngắn gọn về họ và những gì họ sẽ mang lại cho sự kiện.]\n" +
    "    </li>\n" +
    "    <li><strong>Trải nghiệm đặc biệt:</strong> [Nếu có các hoạt động đặc biệt khác như workshop, khu trải nghiệm, photo\n" +
    "        booth, khu vực check-in hay các phần quà/ưu đãi dành riêng cho người tham dự.]\n" +
    "    </li>\n" +
    "</ul>\n" +
    "<p><strong>Điều khoản và điều kiện:</strong></p><p>[TnC] sự kiện</p><p>Lưu ý về điều khoản trẻ em</p><p>Lưu ý về điều\n" +
    "    khoản VAT</p>"

function EventInfo({
                       isDisabled = false,
                       formFields,
                       setFormFields,
                       categories,
                       updateField,
                       updateError
}) {

    const [wardList, setWardList] = useState([]);

    const categoryList = categories.map(category => ({
        id: category.id,
        label: category.name,
        value: category.id
    }))
    //change wardlist when the province change
    useEffect(() => {
        if (!formFields.province.value) {
            setWardList([]);
            return;
        }

        const selectedProvince = AddressData.find(
            (item) => item.province === formFields.province.value
        );

        if (selectedProvince) {
            const newWardList = selectedProvince.wards.map((item, index) => ({
                id: index,
                value: item,
                label: item
            }));

            setWardList(newWardList);

            // Nếu ward.value không nằm trong danh sách ward mới thì reset
            const isWardValid = newWardList.some(opt => opt.value === formFields.ward.value);
            if (!isWardValid) {
                setFormFields(prevState => ({
                    ...prevState,
                    ward: {
                        ...prevState.ward,
                        value: "",  // chỉ reset nếu không hợp lệ
                        error: "",
                    }
                }));
            }
        } else {
            setWardList([]);
        }
    }, [formFields.province.value])


    // VALIDATE FIELD
    const validateEventName = (value) => {
        const fieldName = formFields.name.label;
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 200);
        return error || null;

    }

    const validateEventType = (value) => {
        const fieldName = formFields.isOnline.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;

    }

    const validateEventProvince = (value) => {
        const fieldName = formFields.province.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;

    }
    const validateEventWard = (value) => {
        const fieldName = formFields.ward.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;

    }

    const validateEventLocation= (value) => {
        const fieldName = formFields.location.label;
        const error = checkRequiredInput(fieldName, value)
            || checkStringMaxLength(value, fieldName, 250)
        ;
        return error || null;

    }
    const validateEventCategory= (value) => {
        const fieldName = formFields.category.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;
    }

    const validateEventDescription = (value) => {
        const fieldName = formFields.description.label;
        const error = checkRequiredInput(fieldName, value);
        return error || null;

    }

    const validateEventStartTime = (startValue, endValue) => {
        const fieldName = formFields.startTime.label;
        const error = checkRequiredInput(fieldName, startValue)
            || checkValidDate(fieldName, startValue, DATETIME_FORMAT)
            || checkDateBefore(fieldName, startValue, endValue, formFields.endTime.label, DATETIME_FORMAT)

        return error || null;

    }

    const validateEventEndTime = (endValue, startValue) => {
        const fieldName = formFields.endTime.label;
        const error = checkRequiredInput(fieldName, endValue)
            || checkValidDate(fieldName, endValue, DATETIME_FORMAT)
            || checkDateAfter(fieldName, endValue, startValue, formFields.startTime.label, DATETIME_FORMAT);

        return error || null;
    };

    const handleStartEndChange = (fieldName, newValue) => {
        const startVal = fieldName === "startTime" ? newValue : formFields.startTime.value;
        const endVal = fieldName === "endTime" ? newValue : formFields.endTime.value;

        updateField(fieldName, newValue);

        const startError = validateEventStartTime(startVal, endVal);
        const endError = validateEventEndTime(endVal, startVal);

        updateError("startTime", startError);
        updateError("endTime", endError);
    };

    const validateEventLogo = (file) => {
        const fieldName = formFields.eventLogoUri.label;
        const error = checkUploadImage(fieldName, file, 5)
        return error || null;
    }

    const validateEventBanner = (file) => {
        const fieldName = formFields.bannerUri.label;
        const error = checkUploadImage(fieldName, file, 5)
        return error || null;
    }

    const validateOrganizerLogo = (file) => {
        const fieldName = formFields.organizerLogoUri.label;
        const error = checkUploadImage(fieldName, file, 5)
        return error || null;
    }

    const validateOrganizerName = (value) => {
        const fieldName = formFields.organizerName.label;
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 200);
        if (error) {
            return error;
        }
        return null;
    }

    const validateOrganizerInformation = (value) => {
        const fieldName = formFields.organizerInformation.label;
        const error = checkRequiredInput(fieldName, value) || checkStringMaxLength(value, fieldName, 250);
        if (error) {
            return error;
        }
        return null;
    }

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
                <InputLabel >
                        <span style={{color: "#027A48"}}>
                            Upload hình ảnh sự kiện <span style={{color: "red"}}>*</span>
                        </span>
                </InputLabel>
                <Stack
                    direction={{sm: 'column', md: 'row'}}
                    spacing={1}
                    mt={1}
                    mb={1}
                    sx={{
                        height: {
                            sm: 'auto',
                            md: "30vh"
                        }
                    }}
                >
                    <Box
                        sx={{
                            flex: {
                                sm: "0 0 100%", //column 100%
                                md: "0 0 30%"  //row 70%
                            },
                            maxWidth: {
                                sm: '100%',
                                md: '30%'
                            },

                        }}
                    >
                        <ValidateUploadImage
                            label={formFields.eventLogoUri.label}
                            fieldName="eventLogoUri"
                            value={formFields.eventLogoUri.value}
                            setValue={updateField}
                            error={formFields.eventLogoUri.error}
                            setError={updateError}
                            isRequired={true}
                            isDisabled={isDisabled}
                            validatorFunction={validateEventLogo}
                        />
                    </Box>
                    <Box
                         sx={{
                             flex: {
                                 sm: '0 0 100%',
                                 md: '0 0 70%'
                             },
                             maxWidth: {
                                 sm: '100%',
                                 md: '70%'
                             },
                             paddingRight: "10px",
                         }}
                    >
                        <ValidateUploadImage
                            label={formFields.bannerUri.label}
                            fieldName="bannerUri"
                            value={formFields.bannerUri.value}
                            setValue={updateField}
                            error={formFields.bannerUri.error}
                            setError={updateError}
                            isRequired={true}
                            isDisabled={isDisabled}
                            validatorFunction={validateEventBanner}
                        />
                    </Box>

                </Stack>
                <ValidationTextField
                    label={formFields.name.label}
                    fieldName="name"
                    value={formFields.name.value}
                    error={formFields.name.error}
                    validatorFunction={validateEventName}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                    type="text"
                />

                <Stack direction={'row'} spacing={1} mt={1}>
                    <ValidateDateTimePicker
                        label={formFields.startTime.label}
                        fieldName="startTime"
                        value={formFields.startTime.value}
                        error={formFields.startTime.error}
                        isRequired={true}
                        isDisabled={isDisabled}
                        onChange={(val) => handleStartEndChange("startTime", val)}
                        // setValue={updateField}
                        // setError={updateError}
                        // validatorFunction={(val) => handleStartEndChange("startTime", val)}
                    />
                    <ValidateDateTimePicker
                        label={formFields.endTime.label}
                        fieldName="endTime"
                        value={formFields.endTime.value}
                        error={formFields.endTime.error}
                        isRequired={true}
                        isDisabled={isDisabled}
                        onChange={(val) => handleStartEndChange("endTime", val)}
                        // setValue={updateField}
                        // setError={updateError}
                        // validatorFunction={(val) => handleStartEndChange("endTime", val)}
                    />

                </Stack>

            </Box>
            {/*Address*/}
            <Box
                sx={{
                    margin: "10px 10px",
                    backgroundColor: "white",
                    borderRadius: '4px',
                    padding: '10px',
                }}
            >
                <Box ml={2}>
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
                        isDisabled={isDisabled}
                        defaultValue={false}
                    />
                </Box>
                {!formFields.isOnline.value && (
                    <Stack direction={'row'} spacing={1} mb={1}>
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
                            isDisabled={isDisabled}
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
                            isDisabled={isDisabled}
                        />
                    </Stack>
                )}
                <ValidationTextField
                    label={formFields.location.label}
                    fieldName="location"
                    value={formFields.location.value}
                    error={formFields.location.error}
                    validatorFunction={validateEventLocation}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
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
                <ValidateSelect
                    label={formFields.category.label}
                    fieldName="category"
                    value={formFields.category.value}
                    error={formFields.category.error}
                    validatorFunction={validateEventCategory}
                    setValue={updateField}
                    setError={updateError}
                    listOptions={categoryList}
                    isRequired={true}
                    isDisabled={isDisabled}
                />
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
                <ValidateRichTextEditor
                    label={formFields.description.label}
                    fieldName="description"
                    value={formFields.description.value || DEFAULT_DESCRIPTION}
                    error={formFields.description.error}
                    validatorFunction={validateEventDescription}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
                    isDisabled={isDisabled}
                />
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
                <Stack
                    direction={{sm: 'column', md: 'row'}}
                    spacing={1}
                    mt={1}
                    mb={1}
                    display="flex"
                >
                    <Box
                        sx={{
                            height: "200px",
                            width: {
                                sm: "100%",
                                md: "20%"
                            },
                        }}
                    >
                        <ValidateUploadImage
                            label={formFields.organizerLogoUri.label}
                            fieldName="organizerLogoUri"
                            value={formFields.organizerLogoUri.value}
                            setValue={updateField}
                            error={formFields.organizerLogoUri.error}
                            setError={updateError}
                            isRequired={true}
                            isDisabled={isDisabled}
                            validatorFunction={validateOrganizerLogo}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: {
                                sm: "100%",
                                md: "80%"
                            },
                        }}
                    >
                        <ValidationTextField
                            label={formFields.organizerName.label}
                            fieldName="organizerName"
                            value={formFields.organizerName.value}
                            error={formFields.organizerName.error}
                            validatorFunction={validateOrganizerName}
                            setValue={updateField}
                            setError={updateError}
                            isRequired={true}
                            isDisabled={isDisabled}
                            type="text"
                            sx={{
                                marginBottom: '10px',
                            }}
                        />

                        <ValidationTextField
                            label={formFields.organizerInformation.label}
                            fieldName="organizerInformation"
                            value={formFields.organizerInformation.value}
                            error={formFields.organizerInformation.error}
                            validatorFunction={validateOrganizerInformation}
                            setValue={updateField}
                            setError={updateError}
                            isRequired={true}
                            isDisabled={isDisabled}
                            type="text"
                        />
                    </Box>

                </Stack>
            </Box>
        </Box>
    );
}

export default EventInfo;