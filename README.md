# Santa Prod.

Личное веб-приложение продюсера-сценариста.

**Стек:** Next.js · Firebase Auth · Cloud Firestore

## Фаза 1 — «Можно писать»

- Auth (Firebase Email/Password)
- Проекты CRUD
- Дашборд
- Редактор сценария (5 типов блоков)
- Автосохранение + «Сохранить версию»
- Оглавление сцен

## Быстрый старт

### 1. Firebase

1. Создайте проект на [console.firebase.google.com](https://console.firebase.google.com)
2. Добавьте **Web-приложение** → скопируйте config
3. **Authentication** → включите **Email/Password**
4. **Firestore** → создайте базу данных (production mode)
5. Привяжите CLI и задеплойте правила:

```bash
npx -y firebase-tools@latest login
npx -y firebase-tools@latest use your-project-id
npx -y firebase-tools@latest deploy --only firestore
```

### 2. Переменные окружения

```bash
cd apps/web
cp .env.example .env.local
# заполните NEXT_PUBLIC_FIREBASE_* из Firebase Console
```

### 3. Запуск

```bash
cd apps/web
npm install
npm run dev
```

## Маршруты

| Путь | Описание |
|------|----------|
| `/login` | Вход / регистрация |
| `/` | Дашборд проектов |
| `/projects/new` | Новый проект |
| `/projects/[id]/script` | Редактор сценария |

## Firestore структура

```
projects/{projectId}
scripts/{scriptId}
scripts/{scriptId}/versions/{versionId}  → blocks[] внутри документа
```

## Security Rules

Прототип правил в `firestore.rules` — доступ только владельцу проекта. Перед публичным релизом стоит их перепроверить.
