import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

type Option<T> = {
    label: string;
    value: T;
};

type AppSelectProps<T> = {
    label: string;
    value: T;
    onChange: (value: T) => void;
    options: Option<T>[];
    width?: number;
    size?: "small" | "medium";
    onClick?: (e: React.MouseEvent) => void;
};

const AppSelect = <T extends string | number>({
    label,
    value,
    onChange,
    options,
    width = 150,
    size = "medium",
    onClick,
}: Readonly<AppSelectProps<T>>) => {
    return (
        <FormControl sx={{ minWidth: width }}>
            <InputLabel shrink>{label}</InputLabel>
            <Select
                displayEmpty
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value as T)}
                onClick={onClick}
                size={size}
            >
                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default AppSelect;
