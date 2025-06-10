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

export const checkValidDate = (dateStr, dateFormats) => {
    const parsedDate = dayjs(dateStr, dateFormats, true);
    if (!parsedDate.isValid()) {
        return formatString(Messages.MSG_E_00006, dateFormats);
    }
    return null;
};

