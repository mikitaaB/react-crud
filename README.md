# react-tasks-crud

## Описание проекта

Одностраничное приложение для управления задачами. Включает в себя CRUD-операции для задач, 
возможность фильтрации (статус, приоритет, тег), сортировки (дата создания, дедлайн) и поиска по названию. На главной странице задачи отображаются в виде карточек с подробной информацией с пагинацией по скролу.

## Tech Stack
- **Frontend:** React, MUI, React Router v6, react-hook-form, zod, JSON Server, RTK Query, Vite


## Запуск проекта

1. Установить node.js: https://nodejs.org/en/ (LTS)
2. Установка зависимостей
    ```
    npm install
    ```

3. Запустить в клиент в **dev** режиме:
   ```
   npm run dev
   ```
    Приложение откроется по адресу **http://localhost:5173**.

4. Запустить json server для имитации backend:
    ```
    npm run start:db
    ```

    Сервер будет доступен по адресу **http://localhost:5000**.

    #### Production сборка

- `npm run build` - сборка production версии
- `npm run preview` - запуск production версии


## Архитектура проекта

**Роутинг** - React Router v6, lazy-загрузка страниц, общий layout с навигацией. Маршруты:
- **`/`** - главная страница со списком задач и фильтрами
- **`/tasks/new`** - создание новой задачи
- **`/tasks/:id`** - просмотр задачи
- **`/tasks/:id/edit`** - редактирование задачи

**Данные** - Redux Toolkit + RTK Query: кэш, запросы к API, инвалидация по тегам.

**Backend** - JSON Server (`db.json`), порт 5000.

Эндпоинты:

`GET/POST/PATCH/DELETE /tasks`,

`GET/POST /tags`.
