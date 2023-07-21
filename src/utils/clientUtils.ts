const TEXT_MAX_LENGTH = 35;

export const truncateText = (text: string) => {
    if (text.length > TEXT_MAX_LENGTH) {
        return text.slice(0, TEXT_MAX_LENGTH) + "...";
    } else {
        return text;
    }
};