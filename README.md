# soroka prinesla — Портфолио

Личный сайт продюсера и сценариста. Публичный, без авторизации.

## Стек

Next.js · TypeScript · Tailwind CSS

## Запуск локально

Из корня репозитория (после первой установки зависимостей):

```bash
cd apps/web
npm install
cd ../..
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Тесты

```bash
cd apps/web
npm test
```

Перед деплоем: `npm run lint && npm test && npm run build:pages`

## Редактирование контента

Весь текст сайта — в одном файле:

```
apps/web/src/lib/content/portfolio.ts
```

У каждого проекта в `WORK` есть поля `image` (иллюстрация в `public/work/`) и `links` (массив ссылок с подписью).

### PDF сборника «Стих Есть»

Положите файл сюда:

```
apps/web/public/books/stih-yest.pdf
```

Ссылка «Открыть сборник (PDF)» в проекте «Стих Есть» заработает автоматически.

### Видео в окошке на главной

Положите файлы сюда:

```
apps/web/public/video/scenes.mp4
apps/web/public/video/scenes-poster.jpg   ← кадр до старта (необязательно)
```

Видео автоматически играет в правом нижнем углу главного экрана (без звука, по кругу).

## Публичная ссылка (GitHub Pages)

**Сайт:** https://testqcqaweb.github.io/Soroka_prinesla/

### Первый запуск (один раз)

1. Откройте [настройки Pages](https://github.com/testqcqaweb/Soroka_prinesla/settings/pages)
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
