import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { TaskPriority, TaskStatus, type Task } from '../../types/task';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../../services/taskService';
import TagAutocomplete from '../TagAutocomplete';
import AppSelect from '../AppSelect';
import { PRIORITIES, STATUSES } from '../../constants';

const taskSchema = z.object({
    title: z.string().min(5, 'The title must be at least 5 characters long'),
    description: z.string().max(500, 'The description must contain no more than 500 characters'),
    status: z.enum([TaskStatus.Todo, TaskStatus.InProgress, TaskStatus.Done]),
    priority: z.enum([TaskPriority.Low, TaskPriority.Medium, TaskPriority.High]),
    deadline: z.string().min(1, 'Deadline is required'),
    tags: z.array(z.string()).min(1, 'At least one tag is required'),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
    task?: Task;
}

const TaskForm = ({ task }: TaskFormProps) => {
    const navigate = useNavigate();

    const getDefaultValues = (task?: Task): TaskFormValues => ({
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: task?.status ?? TaskStatus.Todo,
        priority: task?.priority ?? TaskPriority.Low,
        deadline: task?.deadline ?? "",
        tags: task?.tags ?? [],
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: getDefaultValues(),
    });

    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    useEffect(() => {
        reset(getDefaultValues(task));
    }, [task, reset]);

    const handleCancelClick = () => {
        if (globalThis.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/");
        }
    }

    const onSubmit = async (data: TaskFormValues) => {
        if (task) {
            await updateTask({ ...data, id: task.id });
        } else {
            await createTask(data);
        }

        navigate("/");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '24px',
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            <TextField
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
                {...control.register('title')}
            />

            <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
                {...control.register('description')}
            />

            <FormControl fullWidth error={!!errors.status}>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <AppSelect<TaskStatus>
                            label="Status"
                            value={field.value}
                            onChange={field.onChange}
                            options={Object.entries(STATUSES).map(([value, label]) => ({
                                value: value as TaskStatus,
                                label,
                            }))}
                        />
                    )}
                />

                {errors.status && (
                    <p style={{ color: '#d32f2f', fontSize: '0.75rem', margin: '3px 14px 0' }}>
                        {errors.status.message}
                    </p>
                )}
            </FormControl>

            <FormControl component="fieldset" fullWidth error={!!errors.priority}>
                <FormLabel component="legend" sx={{ mb: 1 }}>
                    {"Priority"}
                </FormLabel>

                <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup row {...field}>
                            {Object.entries(PRIORITIES).map(([value, label]) => (
                                <FormControlLabel
                                    key={value}
                                    value={value as TaskPriority}
                                    control={<Radio />}
                                    label={label}
                                />
                            ))}
                        </RadioGroup>
                    )}
                />
            </FormControl>

            <TextField
                label="Deadline"
                type="date"
                fullWidth
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
                {...control.register('deadline')}
            />

            <TagAutocomplete control={control} error={errors.tags} />

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                }}
            >
                <Button variant="outlined" type="button" onClick={handleCancelClick} sx={{ alignSelf: 'flex-end' }}>
                    {"Cancel"}
                </Button>
                <Button variant="contained" type="submit" sx={{ alignSelf: 'flex-end' }}>
                    {task ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    );
};

export default TaskForm;
