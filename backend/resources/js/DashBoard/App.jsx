import "./app.css";
import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from "@mui/icons-material/Settings";
import theme from "./assets/theme";
import themeDark from "./assets/theme-dark";
import MDBox from "./components/MDBox";
import Configurator from "./components/Configurator";
import routes from "./routes";
import {
    useMaterialUIController,
    setOpenConfigurator,
} from "./context/UIContext";
import { LoadingProcess, Message } from "./components/Message";
import Profile from "./pages/Users/Profile";
import ProductDetails from "./pages/Products/ProductDetails";
import EditProgram from "./pages/Programs/EditProgram";
import EditWorkOut from "./pages/Programs/EditProgram/WorkOuts/EditWorkOut";
import ExerciseDetails from "./pages/Exercises/ExerciseDetails";

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const { openConfigurator, darkMode } = controller;
    const { pathname } = useLocation();

    const handleConfiguratorOpen = () =>
        setOpenConfigurator(dispatch, !openConfigurator);

    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return (
                    <Route
                        exact
                        path={route.route}
                        element={route.component}
                        key={route.key}
                    />
                );
            }

            return null;
        });

    const configsButton = (
        <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="3.25rem"
            height="3.25rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
            onClick={handleConfiguratorOpen}
        >
            <SettingsIcon fontSize="medium" itemType="settings" />
        </MDBox>
    );
    return (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
            <CssBaseline />
            <Configurator />
            <Message />
            <LoadingProcess />
            {configsButton}
            <Routes>
                {getRoutes(routes)}
            </Routes>
        </ThemeProvider>
    );
}
