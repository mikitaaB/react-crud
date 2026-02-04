import Box from "@mui/material/Box";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: unknown = useRouteError();

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";

    return (
        <Box
            sx={{
                textAlign: "center",
                py: 11,
            }}
        >
            <p>{"An unexpected error has occurred."}</p>
            <p>{errorMessage}</p>
        </Box>
    );
}
