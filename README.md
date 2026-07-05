# soroka prinesla — Портфолио

Личный сайт продюсера и сценариста. Публичный, без авторизации.

## Стек

Next.js · TypeScript · Tailwind CSS

## Запуск локально

```bash
cd apps/web
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Редактирование контента

Весь текст сайта — в одном файле:

```
apps/web/src/lib/content/portfolio.ts
```

## Публичная ссылка (GitHub Pages)

**Сайт:** https://testqcqaweb.github.io/Obsidian_design/

### Первый запуск (один раз)

1. Откройте [настройки Pages](https://github.com/testqcqaweb/Obsidian_design/settings/pages)
2. **Build and deployment → Source:** выберите **Deploy from a branch**
3. **Branch:** `gh-pages` → папка `/ (root)` → **Save**
4. Подождите 1–2 минуты — сайт откроется по ссылке выше

### Обновление сайта после правок

Каждый push в ветку `main` автоматически пересобирает и выкладывает сайт.

Вручную:

```bash
bash scripts/deploy-gh-pages.sh
```

Или через GitHub Actions: **Actions → Deploy portfolio to GitHub Pages → Run workflow**.

## Бренд

| Элемент | Значение |
|---------|----------|
| Название | soroka prinesla |
| Crimson | `#8B1F24` |
| Фон | `#0C0C0C` |

Логотип: `apps/web/src/components/brand/logo.tsx`
