// Описания страниц для поиска (meta description, og:description).

// Обрезает текст до max символов по границе слова; схлопывает пробелы и переносы.
export const truncateDescription = (text: string | undefined | null, max = 160): string => {
    const clean = (text ?? '').replace(/\u00AD/g, '').replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max);
    const lastSpace = cut.lastIndexOf(' ');
    return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:–-]+$/, '')}…`;
};

const CLINIC = 'клиники «Передовые технологии здоровья»';

// Описания разделов: страницы без собственных полей в контенте.
const SECTION_DESCRIPTIONS: Record<string, string> = {
    '/clinic': `О клинике: история, специалисты, документы и манифест ${CLINIC} в Санкт-Петербурге.`,
    '/clinic/about': `Клиника «Передовые технологии здоровья» основана в 2012 году. О клинике и её подходе к лечению заболеваний опорно-двигательного аппарата.`,
    '/clinic/history': `История создания ${CLINIC}: как складывался подход к лечению вертеброгенных заболеваний.`,
    '/clinic/doctors': `Наши специалисты: врачи ${CLINIC}, их должности и профессиональный опыт.`,
    '/clinic/documents': `Документы ${CLINIC} в Санкт-Петербурге.`,
    '/clinic/manifest': `Наш манифест: принципы и подход ${CLINIC} к здоровью пациента.`,
    '/dimensions': 'Направления работы клиники: лечебная физкультура, реабилитация пациентов с неврологическими заболеваниями, обеспечение спортивных мероприятий, терапия.',
    '/dimensions/physculture': `Лечебная физкультура в клинике «Передовые технологии здоровья»: индивидуально подобранные физические нагрузки.`,
    '/dimensions/reabilitation': `Реабилитация пациентов с неврологическими заболеваниями в клинике «Передовые технологии здоровья».`,
    '/dimensions/provision': `Обеспечение спортивных мероприятий: одно из направлений работы ${CLINIC}.`,
    '/dimensions/therapy': `Терапевтическое направление ${CLINIC}: подбор терапии с учётом индивидуальных особенностей пациента.`,
    '/patients': 'Посетителям и пациентам: полезные советы и ортопедическая продукция.',
    '/patients/useful-tips': `Полезные советы пациентам ${CLINIC}.`,
    '/patients/orthopedic-products': `Ортопедическая продукция для пациентов ${CLINIC}.`,
    '/pricelist': `Цены на услуги ${CLINIC} в Санкт-Петербурге.`,
    '/questions': `Вопрос–ответ: специалисты ${CLINIC} отвечают на вопросы пациентов.`,
    '/reviews': `Отзывы пациентов о клинике «Передовые технологии здоровья».`,
    '/contacts': `Контакты ${CLINIC}: Литейный проспект, 43, Санкт-Петербург, режим работы и как нас найти.`,
    '/news/list': `Новости ${CLINIC}.`,
    '/publications/list': `Публикации специалистов ${CLINIC}.`,
};

// path: уже без слэша в конце (normalizeContentPath).
export const sectionDescription = (path: string): string | null => {
    if (SECTION_DESCRIPTIONS[path]) return SECTION_DESCRIPTIONS[path];
    const list = path.match(/^\/(news|publications)\/list\/(\d+)$/);
    if (list) {
        const base = SECTION_DESCRIPTIONS[`/${list[1]}/list`];
        return `${base.replace(/\.$/, '')}, страница ${list[2]}.`;
    }
    return null;
};
