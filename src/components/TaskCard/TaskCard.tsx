import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { type Task, TaskStatus } from "../../types/task";
import { useUpdateTaskStatusMutation, useGetTagsQuery } from "../../services/taskService";
import AppSelect from "../AppSelect";
import { STATUSES } from "../../constants";

const TaskCard = ({ task, onTagClick }: { task: Task; onTagClick: (tag: string) => void }) => {
    const navigate = useNavigate();
    const [updateStatus] = useUpdateTaskStatusMutation();
    const { data: allTags = [] } = useGetTagsQuery();

    const isOverdue = new Date(task.deadline) < new Date();

    const goToTask = () => navigate(`/tasks/${task.id}`);

    const taskTagObjects = task.tags
        .map(tagId => allTags.find(t => t.id === tagId))
        .filter(Boolean);

    return (
        <Card
            onClick={goToTask}
            sx={{
                cursor: "pointer",
                borderRadius: 3,
                border: isOverdue ? "2px solid #d32f2f" : "1px solid rgba(0,0,0,0.15)",
                background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                transition: "0.2s",
                "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transform: "translateY(-3px)",
                },
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {task.title}
                </Typography>

                <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                    {task.description}
                </Typography>

                <AppSelect<TaskStatus>
                    label="Статус"
                    value={task.status}
                    onChange={(value) =>
                        updateStatus({ id: task.id, status: value })
                    }
                    onClick={(e) => e.stopPropagation()}
                    options={Object.entries(STATUSES).map(([value, label]) => ({
                        value: value as TaskStatus,
                        label,
                    }))}
                    size="small"
                    width={140}
                />

                <Typography variant="body2">
                    {"Приоритет: "}<strong>{task.priority}</strong>
                </Typography>

                <Typography variant="body2">
                    {"Дедлайн: "}<strong>{task.deadline}</strong>
                </Typography>

                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {taskTagObjects.map(tag => (
                        <Chip
                            key={tag!.id}
                            label={tag!.name}
                            size="small"
                            clickable
                            onClick={(e) => {
                                e.stopPropagation();
                                onTagClick(tag!.id);
                            }}
                            sx={{ bgcolor: "#cde8fc" }}
                        />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TaskCard;
