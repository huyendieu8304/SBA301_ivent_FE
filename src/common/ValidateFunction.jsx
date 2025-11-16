import dayjs from "dayjs";
import { formatString } from "./FormatFunction.jsx";
import Messages from "./Message.jsx";

export const checkStringType = (str, isFullSize = true) => {
    for (const char of str) {
        const byteLength = new TextEncoder().encode(char).length;
        if (isFullSize) {
            if (byteLength !== 3 && byteLength !== 4) {
                return false;
            }
        } else {
            if (byteLength === 3 || byteLength === 4) {
                return false;
            }
        }
    }
    return true;
};

export const checkEmailFormat = (fieldName, fieldValue) => {
    if (!fieldValue.includes("@")) {
        return formatString(Messages.MSG_E_00001, fieldName);
    }
    const parts = fieldValue.split("@");
    if (parts.length !== 2 || !parts[1].includes(".")) {
        return formatString(Messages.MSG_E_00001, fieldName);
    }
    return null;
};

export const checkMustBeforeToday = (fieldName, fieldValue) => {
    const currentDate = dayjs(fieldValue);
    const today = dayjs();
    if (currentDate.isAfter(today, "day")) {
        return formatString(Messages.MSG_E_00009, fieldName);
    }
    return null;
};

export const checkMustAfterToday = (fieldName, fieldValue) => {
    const currentDate = dayjs(fieldValue);
    const today = dayjs();
    if (!currentDate.isAfter(today, "day")) {
        return formatString(Messages.MSG_E_00010, fieldName);
    }
    return null;
};
export const checkRequiredInput = (fieldName, fieldValue) => {
    if (!fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        return formatString(Messages.MSG_E_00002, fieldName);
    }
    return null;
};
export const checkNumberLimitInput = (fieldName, fieldValue, limitNumber) => {
    if (fieldValue.length > limitNumber) {
        return formatString(Messages.MSG_E_00003, fieldName, limitNumber);
    }
    return null;
};
export const checkStrLengthInRange = (
    fieldName,
    fieldValue,
    minLen,
    maxLen,
) => {
    if (fieldValue.length > maxLen || fieldValue.length < minLen) {
        //đang trả về sai message, ai dùng thì viết lại nhé
        return formatString(Messages.MSG_E_00004, fieldName, minLen, maxLen);
    }
    return null;
};
export const checkHaflSizeInput = (fieldName, fieldValue) => {
    if (!checkStringType(fieldValue, false)) {
        return formatString(
            Messages.MSG_E_00002,
            fieldName,
            "Half-size alpha numeric symbol",
        );
    }
    return null;
};
export const checkNumberAndHyphenHalfSize = (fieldName, fieldValue) => {
    const halfSizeNumberHyphenRegex = /^[0-9\-]+$/;
    if (!halfSizeNumberHyphenRegex.test(fieldValue)) {
        return formatString(
            Messages.MSG_E_00002,
            fieldName,
            "chữ số half size và dấu gạch ngang half size",
        );
    }
    return null;
};
export const checkFullSizeInput = (fieldName, fieldValue) => {
    if (!checkStringType(fieldValue, true)) {
        return formatString(
            Messages.MSG_E_00002,
            fieldName,
            "Full-size alpha numeric symbol",
        );
    }
    return null;
};
export const checkFullSizeKanaInput = (fieldName, fieldValue) => {
    const fullSizeKanaRegex =
        /^[\p{Script=Hiragana}\p{Script=Katakana}ー・]+$/u;
    if (!fullSizeKanaRegex.test(fieldValue)) {
        return formatString(Messages.MSG_E_00002, fieldName, "kana full-size");
    }
    return null;
};

//thực ra cái hàm này có thể check cả date time luôn, chỉ cần truyền dateFormats có định dạng time vào laf được
export const checkValidDate = (fieldName, dateStr, dateFormats) => {
    const parsedDate = dayjs(dateStr, dateFormats, true);
    if (!parsedDate.isValid()) {
        return formatString(Messages.MSG_E_00003, fieldName, dateFormats);
    }
    return null;
};

// cái này là check cả datetime phải after nhé, chuws neeus cùng ngày là nó vẫn báo lỗi
export const checkDateBefore = (fieldName, valueDate, maxDate, maxDateFieldName, dateFormats) => {
    const parsedValue = dayjs(valueDate, dateFormats, true);
    const parsedMax = dayjs(maxDate, dateFormats, true);

    if (parsedValue.isAfter(parsedMax)) {
        return formatString(Messages.MSG_E_00010, fieldName, maxDateFieldName );
    }

    return null;
};

export const checkDateAfter = (fieldName, valueDate, minDate, minDateFieldName, dateFormats) => {
    const parsedValue = dayjs(valueDate, dateFormats, true);
    const parsedMin = dayjs(minDate, dateFormats, true);

    if (!parsedValue.isAfter(parsedMin)) {
        return formatString(Messages.MSG_E_00009, fieldName, minDateFieldName);
    }

    return null;
};

export const checkOnlyDateAfter = (fieldName, valueDate, minDate, minDateFieldName, dateFormats) => {
    const parsedValue = dayjs(valueDate, dateFormats, true);
    const parsedMin = dayjs(minDate, dateFormats, true);

    if (parsedValue.isBefore(parsedMin, 'day')) {
        return formatString(Messages.MSG_E_00009, fieldName, minDateFieldName);
    }

    return null;
};

export const checkOnlyDateBefore = (fieldName, valueDate, minDate, minDateFieldName, dateFormats) => {
    const parsedValue = dayjs(valueDate, dateFormats, true);
    const parsedMin = dayjs(minDate, dateFormats, true);

    if (parsedValue.isAfter(parsedMin, 'day')) {
        return formatString(Messages.MSG_E_00009, fieldName, minDateFieldName);
    }

    return null;
};

export const checkPasswordAndRePasswordInput = (fieldName, value, relatedFieldName, relatedValue) => {
    if (value !== relatedValue) {
        return formatString(Messages.MSG_E_00004, fieldName, relatedFieldName);
    }
    return null;
}

export const checkStringMaxLength = (fieldValue, fieldName, maxLength) => {
    if (fieldValue.length > maxLength) {
        return formatString(Messages.MSG_E_00006, fieldName, maxLength);
    }
    return null;
}

export const checkUploadImage = (fieldName, file, maxSizeMb) => {
    if (!file) {
        return formatString(Messages.MSG_E_00011, fieldName);
    }
    // Kiểm tra MIME type
    if (!file.type.startsWith("image/")) {
        return formatString(Messages.MSG_E_00012, fieldName);
    }
    //kiểm tra kiích thước ảnh
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxSizeBytes) {
        return formatString(Messages.MSG_E_00013, fieldName, maxSizeMb);
    }
    return null;
}

export const checkNumberGreaterThan = (fieldName, fieldValue, minValue, minValueFieldName) => {
    if (fieldValue < minValue) {
        return formatString(Messages.MSG_E_00014, fieldName, minValueFieldName);
    }
    return null;
}

export const checkNumberSmallerThan = (fieldName, fieldValue, maxValue, maxValueFieldName) => {
    if (fieldValue > maxValue) {
        return formatString(Messages.MSG_E_00015, fieldName, maxValueFieldName);
    }
    return null;
}

//for checking ticket and event
export const checkAllFieldsValid = (anObject) => {
    for (const [key, field] of Object.entries(anObject)) {
        // Bỏ qua các field không phải object (như id)
        if (typeof field !== 'object' || field === null) continue;

        if (field.needToCheckBeForSubmit) {
        // Nếu có error thì trả về error luôn
            if (field.error) {
                return field.error;
            }

            // Nếu value không hợp lệ (trừ boolean false)
            const isValueValid = (
                typeof field.value === "boolean" ||
                (field.value !== undefined && field.value !== null && field.value !== "")
            );

            if (!isValueValid) {
                return formatString(Messages.MSG_E_00002, field.label || key);
            }
        }
    }

    // Nếu mọi thứ đều ổn
    return null;
};
