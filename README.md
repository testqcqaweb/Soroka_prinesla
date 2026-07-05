# Santa Prod. — Портфолио

Личный сайт продюсера и сценариста. Публичный, без авторизации.

## Стек

Next.js · TypeScript · Tailwind CSS

## Запуск

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

Там можно изменить имя, биографию, проекты, email, Telegram и услуги.

## Деплой

Подойдёт [Vercel](https://vercel.com), [Netlify](https://netlify.com) или любой хостинг с поддержкой Next.js.

```bash
npm run build
npm start
```

## Бренд

| Элемент | Значение |
|---------|----------|
| Название | Santa Prod. |
| Crimson | `#8B1F24` |
| Фон | `#0C0C0C` |

Логотип: `apps/web/public/santa-prod-logo.png`
