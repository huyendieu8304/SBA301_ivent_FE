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
