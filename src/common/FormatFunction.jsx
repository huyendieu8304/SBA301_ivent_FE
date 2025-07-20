export const formatString = (template, ...values) =>
    template.replace(/{(\d+)}/g, (_, index) => values[index] ?? `{${index}}`);

export const formatDateFromISO = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date)) return null;
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
};

export const formatVNDateFromISO = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date)) return null;
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd} tháng ${mm}, ${yyyy}`;
};

export const formatDateTimeFromISO = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    if (isNaN(date)) return null;
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");
    return `${mm}/${dd}/${yyyy} ${hh}:${min}:${sec}`;
};

//remove .00 and insert . in each 3 digits
export const formatMoney = (moneyInput) => {
    const moneyString = String(moneyInput);
    const [integerPart, decimalPart] = moneyString.split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (!decimalPart || decimalPart === "00") {
        return formattedInteger;
    }
    return `${formattedInteger}.${decimalPart}`;
};

//input: "startTime": "2025-07-10T08:00:00",
//     "endTime": "2025-07-10T17:00:00",
//output
//08:00 - 17:00, 10 Tháng 07, 2025
//08:00, 11 tháng 07, 2025 - 15:00, 13 tháng 07, 2025
export const formatDateTimeRange = (startTime, endTime) =>  {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const pad = (n) => n.toString().padStart(2, "0");

    const formatTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    const formatDate = (date) =>
        `${pad(date.getDate())} Tháng ${pad(date.getMonth() + 1)}, ${date.getFullYear()}`;

    const sameDate =
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate();

    if (sameDate) {
        return `${formatTime(start)} - ${formatTime(end)}, ${formatDate(start)}`;
    } else {
        return `${formatTime(start)}, ${formatDate(start)} - ${formatTime(end)}, ${formatDate(end)}`;
    }
}

export const formatCurrency = (number, suffix = "") => {
    if (isNaN(number)) return null;
    return number
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + `${suffix}`;
};