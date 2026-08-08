# NoteHub (Next.js Routing)

Продовження проєкту `06-notehub-nextjs`. Базова версія застосунку для керування
особистими нотатками перенесена сюди як стартова точка для роботи з маршрутизацією
Next.js App Router.

## Маршрути

| Маршрут       | Опис                                                                  |
| ------------- | --------------------------------------------------------------------- |
| `/`           | Головна сторінка із загальною інформацією про застосунок               |
| `/notes`      | Список нотаток: пошук за ключовим словом, пагінація, створення нотатки |
| `/notes/[id]` | Сторінка деталей однієї нотатки                                        |

`/notes` та `/notes/[id]` — SSR-сторінки: дані завантажуються на сервері через
`fetchQuery` і передаються на клієнт через `HydrationBoundary` (гідратація кешу
TanStack Query). Уся клієнтська логіка винесена у `app/notes/Notes.client.tsx`
та `app/notes/[id]/NoteDetails.client.tsx`.

## Стек

- Next.js 16 (App Router) + TypeScript
- TanStack Query (React Query) — стан запитів у CSR-компонентах
- axios — HTTP-запити
- Formik + Yup — форма створення нотатки
- CSS Modules — стилізація
- Prettier — форматування коду

## Структура

```
app/                     маршрути, layout, loading та error boundaries
components/              компоненти, не прив'язані до маршруту (тека на компонент)
lib/api.ts               функції роботи з NoteHub API
types/note.ts            загальні типи та інтерфейси
```

## Запуск

1. Встановіть залежності:

   ```bash
   npm install
   ```

2. Створіть файл `.env.local` за зразком `.env.example` і вкажіть свій токен
   з [NoteHub API](https://notehub-public.goit.study/api/docs):

   ```bash
   NEXT_PUBLIC_NOTEHUB_TOKEN=your_personal_token
   ```

3. Запустіть дев-сервер:

   ```bash
   npm run dev
   ```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Деплой

Проєкт розгортається на [Vercel](https://vercel.com). У налаштуваннях проєкту
на Vercel потрібно додати змінну оточення `NEXT_PUBLIC_NOTEHUB_TOKEN`.
