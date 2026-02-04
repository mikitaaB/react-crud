import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import { Provider } from 'react-redux';
import { store } from './store';

const MainPage = lazy(() => import("./pages/MainPage"));
const TaskDetailPage = lazy(() => import("./pages/TaskDetailPage"));
const TaskFormPage = lazy(() => import("./pages/TaskFormPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: "tasks/:id",
				element: <TaskDetailPage />,
			},
			{
				path: "tasks/new",
				element: <TaskFormPage />,
			},
			{
				path: "tasks/:id/edit",
				element: <TaskFormPage />,
			},
		],
	},
]);

export default function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}
