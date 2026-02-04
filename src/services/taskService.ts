import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task, Tag, TaskStatus } from '../types/task';

const BASE_URL = 'http://localhost:5000';

interface QueryParams {
    page: number;
    limit: number;
    status?: string;
    priority?: string;
    search?: string;
    tag?: string;
    sort?: string;
}

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Tasks", "Task", "Tags"],
    endpoints: (builder) => ({
        getTasks: builder.query<{ tasks: Task[], hasMore: boolean }, QueryParams>({
            query: ({ page, limit, status, priority, search, tag, sort }) => {
                const params = new URLSearchParams();

                params.set("_page", String(page));
                params.set("_limit", String(limit));

                if (status) params.set("status", status);
                if (priority) params.set("priority", priority);
                if (search) params.set("title_like", search);
                if (tag) params.set("tags_like", tag);

                if (sort) {
                    const [field, order] = sort.split("_");
                    params.set("_sort", field);
                    params.set("_order", order);
                }

                return `/tasks?${params.toString()}`;
            },

            transformResponse: (tasks: Task[], meta) => {
                const linkHeader = meta?.response?.headers.get("Link");
                const hasMore = linkHeader ? linkHeader.includes('rel="next"') : false;

                return { tasks, hasMore };
            },

            serializeQueryArgs: ({ endpointName, queryArgs }: {
                endpointName: string;
                queryArgs: QueryParams;
            }) => {
                const serializedFilters = Object.keys(queryArgs)
                    .filter(key => key !== 'page')
                    .reduce((obj: Record<string, unknown>, key: string) => {
                        if (key in queryArgs) {
                            obj[key] = queryArgs[key as keyof QueryParams];
                        }
                        return obj;
                    }, {} as Record<string, unknown>);

                return `${endpointName}/${JSON.stringify(serializedFilters)}`;
            },

            merge: (currentCache, newResponse, { arg }) => {
                if (arg.page === 1) {
                    return newResponse;
                }

                return {
                    tasks: currentCache.tasks.concat(newResponse.tasks),
                    hasMore: newResponse.hasMore,
                };
            },

            forceRefetch({ currentArg, previousArg }) {
                return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
            },
        }),

        getTask: builder.query<Task, string>({
            query: (id) => `/tasks/${id}`,
            providesTags: (_, __, id) => [{ type: "Task", id }],
        }),

        createTask: builder.mutation<Task, Partial<Task>>({
            query: (newTask) => ({
                url: '/tasks',
                method: 'POST',
                body: {
                    ...newTask,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            }),
            invalidatesTags: ["Tasks"],
        }),

        updateTask: builder.mutation<Task, Partial<Task> & { id: string }>({
            query: ({ id, ...updatedTask }) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: {
                    ...updatedTask,
                    updatedAt: new Date().toISOString(),
                },
            }),
            invalidatesTags: (_, __, { id }) => [
                "Tasks",
                { type: "Task", id },
            ],
        }),

        updateTaskStatus: builder.mutation<Task, { id: string; status: TaskStatus }>({
            query: ({ id, status }) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: { status, updatedAt: new Date().toISOString() },
            }),
            invalidatesTags: (_, __, { id }) => [
                "Tasks",
                { type: "Task", id },
            ],
        }),

        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Tasks"],
        }),

        getTags: builder.query<Tag[], void>({
            query: () => '/tags',
            providesTags: ["Tags"],
        }),

        createTag: builder.mutation<Tag, Partial<Tag>>({
            query: (newTag) => ({
                url: '/tags',
                method: 'POST',
                body: newTag,
            }),
            invalidatesTags: ["Tags"],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateTaskStatusMutation,
    useDeleteTaskMutation,
    useGetTagsQuery,
    useCreateTagMutation,
} = taskApi;
