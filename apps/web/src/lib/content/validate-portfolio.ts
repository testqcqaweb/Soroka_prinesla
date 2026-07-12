import { BRAND } from "@/lib/brand";
import {
  ABOUT,
  EXPERIENCE,
  NAV,
  SERVICES,
  SITE,
  WORK,
  type WorkItem,
} from "@/lib/content/portfolio";

export const SECTION_IDS = ["about", "work", "experience", "services", "contact"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https:\/\/.+/;
const LOCAL_BOOK_RE = /^\/books\/.+\.pdf$/;
const LOCAL_VIDEO_RE = /^\/video\/.+\.(mp4|webm)$/;

export type PortfolioValidationIssue = {
  field: string;
  message: string;
};

export function validatePortfolioContent(): PortfolioValidationIssue[] {
  const issues: PortfolioValidationIssue[] = [];

  if (!SITE.fullName.trim()) {
    issues.push({ field: "SITE.fullName", message: "Имя не может быть пустым" });
  }

  if (!EMAIL_RE.test(SITE.email)) {
    issues.push({ field: "SITE.email", message: "Некорректный email" });
  }

  if (!SITE.phoneHref.startsWith("tel:")) {
    issues.push({ field: "SITE.phoneHref", message: "phoneHref должен начинаться с tel:" });
  }

  for (const [key, social] of Object.entries(SITE.social)) {
    if (!URL_RE.test(social.href)) {
      issues.push({ field: `SITE.social.${key}.href`, message: "Ссылка должна быть https" });
    }
    if (!social.label.trim()) {
      issues.push({ field: `SITE.social.${key}.label`, message: "Подпись не может быть пустой" });
    }
  }

  const slugs = WORK.map((item) => item.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    issues.push({
      field: "WORK.slug",
      message: `Дублирующиеся slug: ${[...new Set(duplicateSlugs)].join(", ")}`,
    });
  }

  if (WORK.filter((item) => item.featured).length === 0) {
    issues.push({ field: "WORK.featured", message: "Нужен хотя бы один избранный проект" });
  }

  for (const item of WORK) {
    issues.push(...validateWorkItem(item));
  }

  if (ABOUT.bio.some((paragraph) => !paragraph.trim())) {
    issues.push({ field: "ABOUT.bio", message: "Биография не может содержать пустые абзацы" });
  }

  if (ABOUT.stats.some((stat) => !stat.label.trim() || !stat.value.trim())) {
    issues.push({ field: "ABOUT.stats", message: "Статистика должна иметь label и value" });
  }

  const languageLevels: Record<string, string> = {
    Английский: "B2",
    Немецкий: "B1",
    Чешский: "C1",
    Словацкий: "B2",
  };

  for (const [lang, expectedLevel] of Object.entries(languageLevels)) {
    const entry = ABOUT.languages.find((item) => item.lang === lang);
    if (!entry) {
      issues.push({ field: "ABOUT.languages", message: `Не найден язык: ${lang}` });
      continue;
    }
    if (entry.level !== expectedLevel) {
      issues.push({
        field: `ABOUT.languages.${lang}`,
        message: `Ожидался уровень ${expectedLevel}, получен ${entry.level || "пусто"}`,
      });
    }
  }

  if (EXPERIENCE.some((item) => !item.title.trim() || !item.place.trim())) {
    issues.push({ field: "EXPERIENCE", message: "Каждый пункт опыта должен иметь title и place" });
  }

  if (SERVICES.some((service) => !service.title.trim() || !service.description.trim())) {
    issues.push({ field: "SERVICES", message: "Каждая услуга должна иметь title и description" });
  }

  for (const navItem of NAV) {
    const id = navItem.href.replace("#", "");
    if (!SECTION_IDS.includes(id as (typeof SECTION_IDS)[number])) {
      issues.push({
        field: `NAV.${navItem.href}`,
        message: `Якорь ${navItem.href} не соответствует секциям страницы`,
      });
    }
  }

  for (const sectionId of SECTION_IDS) {
    const href = `#${sectionId}`;
    if (!NAV.some((item) => item.href === href)) {
      issues.push({
        field: `NAV`,
        message: `В навигации нет ссылки на секцию ${href}`,
      });
    }
  }

  if (!BRAND.name.toLowerCase().includes("soroka")) {
    issues.push({ field: "BRAND.name", message: "Бренд должен содержать soroka" });
  }

  return issues;
}

function validateWorkItem(item: WorkItem): PortfolioValidationIssue[] {
  const issues: PortfolioValidationIssue[] = [];

  if (!item.title.trim()) {
    issues.push({ field: `WORK.${item.slug}.title`, message: "Заголовок проекта пустой" });
  }

  if (item.tags.length === 0) {
    issues.push({ field: `WORK.${item.slug}.tags`, message: "Нужен хотя бы один тег" });
  }

  if (!item.image.startsWith("/work/")) {
    issues.push({
      field: `WORK.${item.slug}.image`,
      message: "image должен указывать на файл в /work/",
    });
  }

  if (item.gallery) {
    for (const [index, image] of item.gallery.entries()) {
      if (!image.startsWith("/work/")) {
        issues.push({
          field: `WORK.${item.slug}.gallery[${index}]`,
          message: "gallery должен указывать на файл в /work/",
        });
      }
    }
  }

  if (item.video && !LOCAL_VIDEO_RE.test(item.video)) {
    issues.push({
      field: `WORK.${item.slug}.video`,
      message: "video должен указывать на файл в /video/ (.mp4 или .webm)",
    });
  }

  if (item.links.length === 0) {
    issues.push({
      field: `WORK.${item.slug}.links`,
      message: "Нужна хотя бы одна ссылка на проект",
    });
  }

  for (const [index, link] of item.links.entries()) {
    if (!link.label.trim()) {
      issues.push({
        field: `WORK.${item.slug}.links[${index}].label`,
        message: "Подпись ссылки не может быть пустой",
      });
    }

    if (!URL_RE.test(link.href) && !LOCAL_BOOK_RE.test(link.href) && !LOCAL_VIDEO_RE.test(link.href)) {
      issues.push({
        field: `WORK.${item.slug}.links[${index}].href`,
        message: "Ссылка должна быть https, PDF в /books/ или видео в /video/",
      });
    }
  }

  return issues;
}

export function assertValidPortfolioContent(): void {
  const issues = validatePortfolioContent();
  if (issues.length > 0) {
    const details = issues.map((issue) => `${issue.field}: ${issue.message}`).join("\n");
    throw new Error(`Portfolio validation failed:\n${details}`);
  }
}
