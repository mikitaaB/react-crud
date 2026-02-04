import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Root = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {"Task Manager"}
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        {"Главная"}
                    </Button>
                    <Button color="inherit" component={Link} to="/tasks/new">
                        {"Создать задачу"}
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 2 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Root;
