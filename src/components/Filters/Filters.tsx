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
                label="Статус"
                value={status}
                onChange={setStatus}
                options={[
                    { label: "Все", value: "" },
                    ...Object.entries(STATUSES).map(([value, label]) => ({
                        value,
                        label,
                    })),
                ]}
            />

            <AppSelect
                label="Приоритет"
                value={priority}
                onChange={setPriority}
                options={[
                    { label: "Все", value: "" },
                    ...Object.entries(PRIORITIES).map(([value, label]) => ({
                        value,
                        label,
                    })),
                ]}
            />

            <AppSelect
                label="Тег"
                value={tag}
                onChange={setTag}
                options={[
                    { label: "Все", value: "" },
                    ...(tagsLoading
                        ? []
                        : tags.map((t) => ({ label: t.name, value: t.id }))),
                ]}
            />

            <AppSelect
                label="Сортировка"
                value={sort}
                onChange={setSort}
                options={[
                    { label: "Без сортировки", value: "" },
                    { label: "По дате создания (по убыв.)", value: "createdAt_desc" },
                    { label: "По дате создания (по возр.)", value: "createdAt_asc" },
                    { label: "По дедлайну (по возр.)", value: "deadline_asc" },
                    { label: "По дедлайну (по убыв.)", value: "deadline_desc" },
                ]}
            />

            <SearchField value={search} onChange={setSearch} />
        </Box>
    );
};

export default Filters;
