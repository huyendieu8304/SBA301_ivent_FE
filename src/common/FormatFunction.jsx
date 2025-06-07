export const formatString = (template, ...values) =>
    template.replace(/{(\d+)}/g, (_, index) => values[index] ?? `{${index}}`);

export const formatDateFromISO = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) return null;
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
};

export const formatDateTimeFromISO = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) return "";

    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");

    return `${mm}/${dd}/${yyyy} ${hh}:${min}:${sec}`;
};

export const formatJapaneseDateTimeFromISO = (isoString) => {
    const date = new Date(isoString);
    if (isNaN(date)) return "";

    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2, "0");

    return `${hh}時${min}分 - ${yyyy}年${mm}月${dd}日`;
};