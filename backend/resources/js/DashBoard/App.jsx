import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from "@mui/icons-material/Settings";
import theme from "./assets/theme";
import themeDark from "./assets/theme-dark";
import MDBox from "./components/MDBox";
import Sidenav from "./components/Sidenav";
import Configurator from "./components/Configurator";
import routes from "./routes";
import {
    useMaterialUIController,
    setMiniSidenav,
    setOpenConfigurator,
} from "./dashboardContext";
import brandWhite from "./assets/images/logo-ct.png";
import brandDark from "./assets/images/logo-ct-dark.png";
import DashboardNavbar from "./components/Navbars";
import DashboardLayout from "./components/DashboardLayout";
import Footer from "./components/Footer";

export default function App() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const { pathname } = useLocation();

    const handleOnMouseEnter = () => {
        if (miniSidenav && !onMouseEnter) {
            setMiniSidenav(dispatch, false);
            setOnMouseEnter(true);
        }
    };

    const handleOnMouseLeave = () => {
        if (onMouseEnter) {
            setMiniSidenav(dispatch, true);
            setOnMouseEnter(false);
        }
    };

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
            <DashboardLayout>
                <DashboardNavbar />
                <CssBaseline />
                {layout === "dashboard" && (
                    <>
                        <Sidenav
                            color={sidenavColor}
                            brand={
                                (transparentSidenav && !darkMode) ||
                                whiteSidenav
                                    ? brandDark
                                    : brandWhite
                            }
                            brandName="Fitness App"
                            routes={routes}
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                        />
                        <Configurator />
                        {configsButton}
                    </>
                )}
                {layout === "vr" && <Configurator />}
                <Routes>
                    <Route path="*" element={<Navigate to="/home" />} />
                    {getRoutes(routes)}
                </Routes>
                <Footer />
            </DashboardLayout>
        </ThemeProvider>
    );
}
