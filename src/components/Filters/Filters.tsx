import Box from "@mui/material/Box";
import SearchField from "../SearchField";
import AppSelect from "../AppSelect";
import { PRIORITIES, STATUSES } from "../../constants";
import { useGetTagsQuery } from "../../services/taskService";

interface FiltersProps {
    status: string;
    setStatus: (value: string) => void;

    priority: string;
    setPriority: (value: string) => void;

    sort: string;
    setSort: (value: string) => void;

    search: string;
    setSearch: (value: string) => void;

    tag: string;
    setTag: (value: string) => void;
}

const Filters = ({
    status,
    setStatus,
    priority,
    setPriority,
    sort,
    setSort,
    search,
    setSearch,
    tag,
    setTag,
}: FiltersProps) => {
    const { data: tags = [], isLoading: tagsLoading } = useGetTagsQuery();

    return (
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <AppSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                    { label: "All", value: "" },
                    ...Object.entries(STATUSES).map(([value, label]) => ({
                        value,
                        label,
                    })),
                ]}
            />

            <AppSelect
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={[
                    { label: "All", value: "" },
                    ...Object.entries(PRIORITIES).map(([value, label]) => ({
                        value,
                        label,
                    })),
                ]}
            />

            <AppSelect
                label="Tag"
                value={tag}
                onChange={setTag}
                options={[
                    { label: "All", value: "" },
                    ...(tagsLoading
                        ? []
                        : tags.map((t) => ({ label: t.name, value: t.id }))),
                ]}
            />

            <AppSelect
                label="Sort"
                value={sort}
                onChange={setSort}
                options={[
                    { label: "No sorting", value: "" },
                    { label: "By creation date (desc)", value: "createdAt_desc" },
                    { label: "By creation date (asc)", value: "createdAt_asc" },
                    { label: "By deadline (asc)", value: "deadline_asc" },
                    { label: "By deadline (desc)", value: "deadline_desc" },
                ]}
            />

            <SearchField value={search} onChange={setSearch} />
        </Box>
    );
};

export default Filters;
