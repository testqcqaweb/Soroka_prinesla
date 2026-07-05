# soroka prinesla — Портфолио

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
| Название | soroka prinesla |
| Розовый | `#EE71AD` |
| Жёлтый | `#FEBB63` |
| Синий | `#5C79F8` |
| Маджента | `#E12A74` |
| Фон | `#FEBB63` |

Палитра задаётся в `apps/web/src/app/globals.css`.
