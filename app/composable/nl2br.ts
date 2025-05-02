export const useFormatText = () => {
    const nl2br = (text: string) => {
        if (!text) return '';
        return text
            .replace(/(\\n|\n)/g, '<br>')
            .replace(/ {2}/g, '&nbsp;&nbsp;');
    }

    return {nl2br};
}