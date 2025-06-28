import Box from "@mui/material/Box";
import ValidationTextField from "../validateInput/ValidationTextField.jsx";
import {
    checkDateAfter,
    checkDateBefore,
    checkInputStringLength,
    checkRequiredInput,
    checkValidDate
} from "../../common/ValidateFunction.jsx";
import React, {useEffect, useRef, useState} from "react";
import ValidateRadioGroup from "../validateInput/ValidateRadioGroup.jsx";
import AddressData  from "../../AddressData.js";
import ValidateSelect from "../validateInput/ValidateSelect.jsx";
import { Stack} from "@mui/material";
import ValidateRichTextEditor from "../validateInput/ValidateRichTextEditor.jsx";
import { DATETIME_FORMAT} from "../../common/Constant.jsx";
import {ValidateDateTimePicker} from "../validateInput/ValidateDateTimePicker.jsx";

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

function EventInfo({ formFields, setFormFields, categories, updateField, updateError}) {

    const [wardList, setWardList] = useState([]);

    const categoryList = categories.map(category => ({
        id: category.id,
        label: category.name,
        value: category.id
    }))
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


    // VALIDATE FIELD
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
    const validateEventCategory= (value) => {
        const fieldName = formFields.category.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
    }

    const validateEventDescription = (value) => {
        const fieldName = formFields.description.label;
        const error = checkRequiredInput(fieldName, value);
        if (error) {
            return error;
        }
        return null;
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
                <Stack direction={'row'} spacing={1} mt={1}>
                {/*todo anh su kien chua co*/}
                    <p>Thêm ảnh s kiện vào đê</p>
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
                    type="text"
                />

                <Stack direction={'row'} spacing={1} mt={1}>
                    <ValidateDateTimePicker
                        label={formFields.startTime.label}
                        fieldName="startTime"
                        value={formFields.startTime.value}
                        error={formFields.startTime.error}
                        setValue={updateField}
                        setError={updateError}
                        isRequired={true}
                        validatorFunction={(val) => handleStartEndChange("startTime", val)}
                    />
                    <ValidateDateTimePicker
                        label={formFields.endTime.label}
                        fieldName="endTime"
                        value={formFields.endTime.value}
                        error={formFields.endTime.error}
                        setValue={updateField}
                        setError={updateError}
                        isRequired={true}
                        validatorFunction={(val) => handleStartEndChange("endTime", val)}
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
                    value={DEFAULT_DESCRIPTION}
                    error={formFields.description.error}
                    validatorFunction={validateEventDescription}
                    setValue={updateField}
                    setError={updateError}
                    isRequired={true}
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

            </Box>
        </Box>
    );
}

export default EventInfo;