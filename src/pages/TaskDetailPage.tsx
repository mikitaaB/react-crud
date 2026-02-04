import { lazy, Suspense, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteTaskMutation, useGetTaskQuery, useGetTagsQuery } from '../services/taskService';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ConfirmModal = lazy(() => import("../components/ConfirmModal"));

const TaskDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: task, error, isLoading } = useGetTaskQuery(id!);
    const { data: allTags = [] } = useGetTagsQuery();
    const [deleteTask] = useDeleteTaskMutation();

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    if (isLoading) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>{"Загрузка..."}</Typography>
            </Container>
        );
    }

    if (error || !task) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography color="error">{"Ошибка загрузки задачи"}</Typography>
            </Container>
        );
    }

    const handleDelete = async () => {
        await deleteTask(id!);
        navigate('/');
    };

    const taskTagObjects = task.tags
        .map(tagId => allTags.find(t => t.id === tagId))
        .filter(Boolean);

    return (
        <Container sx={{ mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {task.title}
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    {task.description || 'Описание отсутствует'}
                </Typography>

                <Stack spacing={1} sx={{ mb: 3 }}>
                    <Typography variant="body2">
                        <strong>{"Статус:"}</strong> {task.status}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{"Приоритет:"}</strong> {task.priority}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{"Дедлайн:"}</strong> {task.deadline}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{"Теги:"}</strong>{' '}
                        {taskTagObjects.length > 0
                            ? taskTagObjects.map(t => t!.name).join(', ')
                            : '—'}
                    </Typography>
                </Stack>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/tasks/${task.id}/edit`)}
                    >
                        {"Редактировать"}
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        {"Удалить"}
                    </Button>
                </Box>
            </Paper>

            <Suspense fallback={null}>
                {openDeleteModal && (
                    <ConfirmModal
                        open={openDeleteModal}
                        confirmMessage="Вы уверены, что хотите удалить это задание?"
                        confirmBtnText="Удалить"
                        onClose={() => setOpenDeleteModal(false)}
                        onConfirm={handleDelete}
                    />
                )}
            </Suspense>
        </Container>
    );
};

export default TaskDetailPage;
