import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './services/taskService';

export const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
});
