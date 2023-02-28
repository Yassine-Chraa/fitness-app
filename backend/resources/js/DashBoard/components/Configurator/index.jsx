import { useState, useEffect } from "react";
import GitHubButton from "react-github-btn";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";
import ConfiguratorRoot from "./ConfiguratorRoot";

// Material Dashboard 2 React context
import {
    useMaterialUIController,
    setOpenConfigurator,
    setTransparentSidenav,
    setWhiteSidenav,
    setFixedNavbar,
    setSidenavColor,
    setDarkMode,
} from "../../context/UIContext";
import { Card, Modal } from "@mui/material";

function Configurator() {
    const [controller, dispatch] = useMaterialUIController();
    const {
        openConfigurator,
        fixedNavbar,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;
    const [disabled, setDisabled] = useState(false);
    const sidenavColors = [
        "primary",
        "secondary",
        "dark",
        "info",
        "success",
        "warning",
        "error",
    ];

    // Use the useEffect hook to change the button state for the sidenav type based on window size.
    useEffect(() => {
        // A function that sets the disabled state of the buttons for the sidenav type.
        function handleDisabled() {
            return window.innerWidth > 1200
                ? setDisabled(false)
                : setDisabled(true);
        }

        // The event listener that's calling the handleDisabled function when resizing the window.
        window.addEventListener("resize", handleDisabled);

        // Call the handleDisabled function to set the state with the initial value.
        handleDisabled();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleDisabled);
    }, []);

    const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
    const handleTransparentSidenav = () => {
        setTransparentSidenav(dispatch, true);
        setWhiteSidenav(dispatch, false);
    };
    const handleWhiteSidenav = () => {
        setWhiteSidenav(dispatch, true);
        setTransparentSidenav(dispatch, false);
    };
    const handleDarkSidenav = () => {
        setWhiteSidenav(dispatch, false);
        setTransparentSidenav(dispatch, false);
    };
    const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
    const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

    // sidenav type buttons styles
    const sidenavTypeButtonsStyles = ({
        functions: { pxToRem },
        palette: { white, dark, background },
        borders: { borderWidth },
    }) => ({
        height: pxToRem(39),
        background: darkMode ? background.sidenav : white.main,
        color: darkMode ? white.main : dark.main,
        border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode ? background.sidenav : white.main,
            color: darkMode ? white.main : dark.main,
            border: `${borderWidth[1]} solid ${
                darkMode ? white.main : dark.main
            }`,
        },
    });

    // sidenav type active button styles
    const sidenavTypeActiveButtonStyles = ({
        functions: { pxToRem, linearGradient },
        palette: { white, gradients, background },
    }) => ({
        height: pxToRem(39),
        background: darkMode
            ? white.main
            : linearGradient(gradients.dark.main, gradients.dark.state),
        color: darkMode ? background.sidenav : white.main,

        "&:hover, &:focus, &:focus:not(:hover)": {
            background: darkMode
                ? white.main
                : linearGradient(gradients.dark.main, gradients.dark.state),
            color: darkMode ? background.sidenav : white.main,
        },
    });

    return (
        <Modal
            open={openConfigurator}
            onClose={() => setOpenConfigurator(dispatch, false)}
            style={{

                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
            }}
        >
            <Card
                sx={{

                    borderRadius: "10px",
                    boxShadow: "#000e 1px 1px 10px",
                    marginBottom: "2rem",
                    marginRight: "2rem",
                }}
            >
                <MDBox display="flex" alignItems="baseline" pt={2} px={3}>
                    <Icon
                        sx={({
                            typography: { size },
                            palette: { dark, white },
                        }) => ({
                            fontSize: `${size.lg} !important`,
                            color: darkMode ? white.main : dark.main,
                            stroke: "currentColor",
                            strokeWidth: "2px",
                            cursor: "pointer",
                            transform: "translateY(5px)",
                        })}
                        onClick={handleCloseConfigurator}
                    >
                        close
                    </Icon>
                </MDBox>

                <MDBox pb={2} px={3}>
                    <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={3}
                        lineHeight={1}
                    >
                        <MDTypography variant="h6">Navbar Fixed</MDTypography>
                        <Switch
                            checked={fixedNavbar}
                            onChange={handleFixedNavbar}
                        />
                    </MDBox>
                    <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        lineHeight={1}
                    >
                        <MDTypography variant="h6">Light / Dark</MDTypography>
                        <Switch checked={darkMode} onChange={handleDarkMode} />
                    </MDBox>
                </MDBox>
            </Card>
        </Modal>
    );
}

export default Configurator;
