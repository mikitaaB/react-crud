import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetTasksQuery } from "../../services/taskService";
import TaskCard from "../TaskCard";
import LoadMoreTrigger from "../LoadMoreTrigger";

const BATCH_SIZE = 9;

const TaskList = ({
    filters,
    onTagClick,
}: {
    filters: {
        status: string;
        priority: string;
        search: string;
        sort: string;
        tag: string;
    };
    onTagClick: (tag: string) => void;
}) => {
    const [page, setPage] = useState(1);

    const { data, isFetching } = useGetTasksQuery({
        ...filters,
        page,
        limit: BATCH_SIZE,
    }, {
        refetchOnMountOrArgChange: true,
    });
    const items = data?.tasks ?? [];
    const hasMore = data?.hasMore ?? false;

    const loadMore = () => {
        if (!isFetching && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    if (isFetching && page === 1) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (items.length === 0 && !isFetching) {
        return (
            <Box sx={{ textAlign: "center", py: 11 }}>
                {"Задачи не найдены"}
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {items.map((task) => (
                    <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <TaskCard task={task} onTagClick={onTagClick} />
                    </Grid>
                ))}
            </Grid>

            <LoadMoreTrigger
                isLoading={isFetching}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />

            {isFetching && page > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
                    <CircularProgress size={24} />
                </Box>
            )}
        </Box>
    );
};

export default TaskList;
