import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const TaskFormPage = () => {
    const { id } = useParams();

    const isEdit = Boolean(id);
    const { data, isLoading } = useGetTaskQuery(id!, {
        skip: !isEdit,
    });

    const task = isEdit ? data : undefined;

    if (isEdit && isLoading) {
        return (
            <Container sx={{ mt: 4 }}>
                <Typography>{"Loading..."}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                {isEdit ? "Edit the Task" : "Create the Task"}
            </Typography>

            <TaskForm key={id ?? "create"} task={task} />
        </Container>
    );
};

export default TaskFormPage;
