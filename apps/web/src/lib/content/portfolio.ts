export const SITE = {
  name: "Кирилл",
  surname: "Сорокин",
  fullName: "Кирилл Сорокин",
  role: "Сценарист · Продюсер",
  birthDate: "24.05.1994",
  headline: "От первой строки до финального кадра",
  subheadline:
    "Сценарист и продюсер с опытом создания поэтических проектов, управления командами и организации событий «под ключ». Работал в пяти странах и восьми разных сферах — от горячего цеха до режиссуры VHS-клипов.",
  email: "testqcqaweb@gmail.com",
  phone: "+375 (29) 831-25-54",
  phoneHref: "tel:+375298312554",
  location: "Брест, Беларусь",
  available: true,
  social: {
    instagram: {
      label: "@sorokaprineslaa",
      href: "https://www.instagram.com/sorokaprineslaa",
    },
    telegram: {
      label: "@sorokaprineslaa",
      href: "https://t.me/sorokaprineslaa",
    },
  },
} as const;

export const HERO_FILM = {
  label: "Сцены из фильма",
  src: "/video/scenes.mp4",
  poster: "/video/scenes-poster.jpg",
} as const;

export const ABOUT = {
  bio: [
    "Сценарист и продюсер с опытом создания поэтических проектов, управления командами и организации событий «под ключ».",
    "Работал в пяти странах, в восьми разных сферах — от горячего цеха до режиссуры VHS-клипов. Умею превращать идею в готовый продукт: от концепта до реализации.",
    "Владею визуальным языком — VHS-эстетика, Sony CCD-TRV67E, авторский монтаж. Открыт к коллаборациям на стыке поэзии, кино и живых форматов.",
  ],
  stats: [
    { label: "Стран", value: "5" },
    { label: "Сфер деятельности", value: "8" },
    { label: "Человек в команде", value: "15" },
    { label: "Лет опыта", value: "12+" },
  ],
  competencies: [
    "Создание и продюсирование творческих проектов",
    "Организация поэтических (авторских) вечеров",
    "Поэтические сборники, клипы, фестивали",
    "Режиссура и VHS-эстетика (Sony CCD-TRV67E)",
    "Управление командами до 15 человек",
    "Организация процессов с нуля",
    "Коммуникация и переговоры",
    "Notion · Obsidian · Cursor · Google Sheets",
    "Вайбкодинг — поэзия и код",
  ],
  poeticEvenings: {
    title: "Организация поэтических (авторских) вечеров",
    description:
      "Серии камерных вечеров в Бресте — от концепции до сцены: площадка, звук, свет, приглашённые авторы и живая атмосфера.",
    image: "/about/poetic-evening.png",
  },
  languages: [
    { lang: "Русский", level: "родной" },
    { lang: "Белорусский", level: "родной" },
    { lang: "Английский", level: "B2" },
    { lang: "Немецкий", level: "B1" },
    { lang: "Чешский", level: "C1" },
    { lang: "Словацкий", level: "B2" },
    { lang: "Польский", level: "B1" },
    { lang: "Французский", level: "A2" },
  ],
  extra: "Водительские права категории B",
} as const;

export type WorkLink = {
  label: string;
  href: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  type: string;
  year: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
  links: WorkLink[];
  featured?: boolean;
};

const INSTAGRAM = SITE.social.instagram.href;
const TELEGRAM = SITE.social.telegram.href;
const GITHUB_REPO = "https://github.com/testqcqaweb/Soroka_prinesla";

export const WORK: WorkItem[] = [
  {
    slug: "vibecoding",
    title: "Вайбкодинг",
    type: "Авторский проект",
    year: "2025–2026",
    role: "Создатель",
    description:
      "Авторский проект на стыке поэзии и кода. Эксперимент с формой, где текст и технология усиливают друг друга.",
    tags: ["поэзия", "код", "авторское"],
    image: "/work/vibecoding.svg",
    links: [
      { label: "Репозиторий на GitHub", href: GITHUB_REPO },
      { label: "Instagram", href: INSTAGRAM },
    ],
    featured: true,
  },
  {
    slug: "stihi-na-sovetskoy",
    title: "Стихи на советской",
    type: "Поэтический вечер",
    year: "Брест",
    role: "Автор · Продюсер",
    description: "Серия поэтических вечеров в Бресте — камерная атмосфера, живая поэзия, собственная концепция.",
    tags: ["поэзия", "ивент", "Брест"],
    image: "/work/stihi-na-sovetskoy.svg",
    links: [
      { label: "Фото и анонсы в Instagram", href: INSTAGRAM },
      { label: "Telegram", href: TELEGRAM },
    ],
    featured: true,
  },
  {
    slug: "vochy-u-vochy",
    title: "Вочы у вочы",
    type: "Поэтический вечер",
    year: "Брест",
    role: "Автор · Организатор",
    description: "Камерные чтения — интимный формат встречи автора и слушателя.",
    tags: ["поэзия", "камерный формат"],
    image: "/work/vochy-u-vochy.svg",
    links: [{ label: "Анонсы в Instagram", href: INSTAGRAM }],
  },
  {
    slug: "stih-yest",
    title: "Стих Есть",
    type: "Поэтический сборник",
    year: "",
    role: "Автор · Продюсер",
    description:
      "Авторский текст, концепция и издание поэтического сборника. Можно открыть и прочитать онлайн.",
    tags: ["книга", "поэзия", "издание"],
    image: "/work/stih-yest.svg",
    links: [
      { label: "Открыть сборник (PDF)", href: "/books/stih-yest.pdf" },
      { label: "Подробности в Telegram", href: TELEGRAM },
    ],
  },
  {
    slug: "vhs-solntsestanie",
    title: "VHS-клипы · Солнцестояние",
    type: "Музыкальный клип",
    year: "2025",
    role: "Режиссёр",
    description:
      "Режиссура клипов на VHS (Sony CCD-TRV67E) для рок-фестиваля «Солнцестояние 2025».",
    tags: ["VHS", "клип", "фестиваль"],
    image: "/work/vhs-solntsestanie.svg",
    links: [
      { label: "Смотреть на YouTube", href: "https://youtu.be/8Y3V2AOkXY4" },
      { label: "Instagram", href: INSTAGRAM },
    ],
  },
  {
    slug: "vhs-bulvar",
    title: "VHS-клипы · Бульвар",
    type: "Музыкальный клип",
    year: "",
    role: "Режиссёр",
    description: "Режиссура клипов на VHS для кафе «Бульвар» — авторский визуальный язык и монтаж.",
    tags: ["VHS", "клип", "Брест"],
    image: "/work/vhs-bulvar.svg",
    links: [{ label: "Клипы в Instagram", href: INSTAGRAM }],
  },
  {
    slug: "filarmonia",
    title: "Брестская филармония",
    type: "Выступление",
    year: "",
    role: "Участник",
    description: "Участник выступлений в Брестской филармонии.",
    tags: ["поэзия", "сцена", "филармония"],
    image: "/work/filarmonia.svg",
    links: [{ label: "Выступления в Instagram", href: INSTAGRAM }],
  },
];

export type ExperienceItem = {
  title: string;
  place: string;
  period: string;
  points: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Наёмный директор",
    place: "Бар «Кабакъ», Брест",
    period: "2020–2021",
    points: [
      "Полный цикл запуска: концепт, дизайн, закупки",
      "Подбор и обучение команды",
      "Операционное управление",
    ],
  },
  {
    title: "Администратор",
    place: "Ресторан «Генацвале», Брест",
    period: "2019–2020",
    points: [
      "Работа с гостями, создание концепта",
      "Обучение сотрудников",
    ],
  },
  {
    title: "Администратор",
    place: "Ресторан «Бекицер», Санкт-Петербург",
    period: "2018–2019",
    points: [
      "Координация работы зала и кухни",
      "Решение конфликтов, контроль качества",
    ],
  },
  {
    title: "Управленческий опыт",
    place: "Чехия · Франция · Германия",
    period: "2012–2017",
    points: [
      "Работа в мультикультурной среде",
      "Организация процессов и коммуникация",
    ],
  },
];

export const SERVICES = [
  {
    title: "Сценарий",
    description:
      "Авторские тексты, концепции, сценарии для клипов, ивентов и творческих проектов.",
  },
  {
    title: "Продюсирование",
    description:
      "Организация «под ключ»: от идеи до реализации — команда, логистика, координация.",
  },
  {
    title: "Режиссура и VHS",
    description:
      "Визуальный язык, съёмка на Sony CCD-TRV67E, авторский монтаж в эстетике VHS.",
  },
] as const;

export const BACKSTAGE = {
  eyebrow: "За кулисами",
  title: "Всё, из чего собирается работа",
  description:
    "Инструменты, идеи, ритм — камера, звук, текст, сцена. То, что обычно остаётся за кадром публичного сайта.",
  image: "/about/backstage.png",
} as const;

export const NAV = [
  { href: "#about", label: "Обо мне" },
  { href: "#work", label: "Проекты" },
  { href: "#experience", label: "Опыт" },
  { href: "#services", label: "Услуги" },
  { href: "#contact", label: "Контакт" },
] as const;
