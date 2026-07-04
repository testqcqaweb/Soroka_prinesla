# Santa Prod.

Личное веб-приложение продюсера-сценариста: проекты, сценарии, координация.

## Стек

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS**

## Запуск

```bash
cd apps/web
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Бренд

| Элемент | Значение |
|---------|----------|
| Название | **Santa Prod.** |
| Акцент | `#8B1F24` (crimson) |
| Фон | `#141414` (charcoal) |
| Текст | `#F4F0E8` (cream) |

Логотип: `apps/web/public/santa-prod-logo.png`

## Структура

```
apps/web/
├── public/           # логотип, иконки
├── src/
│   ├── app/          # маршруты
│   ├── components/   # UI, layout, brand
│   └── lib/          # brand tokens, типы, db (позже)
```

## Дорожная карта (вариант A)

1. ✅ Бренд и каркас приложения
2. ⬜ База данных (Supabase) + проекты
3. ⬜ Редактор сценария
4. ⬜ Задачи и календарь
5. ⬜ Разработка: синопсис, персонажи, beat sheet
