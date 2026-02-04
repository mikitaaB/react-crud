import { useEffect, useState } from "react";

const useDebounceValue = <T>(value: T, delay: number = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounceValue;
