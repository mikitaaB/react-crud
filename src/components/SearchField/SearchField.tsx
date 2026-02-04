import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import useDebounceValue from "../../hooks/useDebounceValue";

const SearchField = ({
    value,
    onChange,
    delay,
}: {
    value: string;
    onChange: (value: string) => void;
    delay?: number;
}) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounceValue(localValue, delay);

    useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    return (
        <TextField
            label="Поиск"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
        />
    );
};

export default SearchField;
