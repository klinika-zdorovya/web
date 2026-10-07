// Путь для запроса в Nuxt Content без завершающего слэша.
// Статический хостинг отдаёт /news/x/ (редирект на папку), а контент хранится
// по пути /news/x: без нормализации на клиенте запрос не находит страницу и
// после гидрации показывается 404, хотя HTML с сервера был нормальный.
export const normalizeContentPath = (path: string): string => {
    const trimmed = path.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
};
