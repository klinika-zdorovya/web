export const useFormatText = () => {
    const nl2br = (text: string) => {
        if (!text) return '';
        return text
            .replace(/(\\n|\n)/g, '<br>')
            .replace(/ {2}/g, '&nbsp;&nbsp;');
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return {nl2br, formatDate};
}