import { useState } from "react";
import Filters from "../components/Filters";
import TaskList from "../components/TaskList";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MainPage = () => {
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [tag, setTag] = useState("");

    const filtersKey = `${status}-${priority}-${search}-${sort}-${tag}`;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                {"Список задач"}
            </Typography>

            <Filters
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
                sort={sort}
                setSort={setSort}
                search={search}
                setSearch={setSearch}
                tag={tag}
                setTag={setTag}
            />

            <TaskList
                key={filtersKey}
                filters={{ status, priority, search, sort, tag }}
                onTagClick={setTag}
            />
        </Box>
    );
};

export default MainPage;
