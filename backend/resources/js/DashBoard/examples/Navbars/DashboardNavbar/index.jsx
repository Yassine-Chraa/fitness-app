import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MDBox from "../../../components/MDBox";
import MDInput from "../../../components/MDInput";
import Breadcrumbs from "../../../examples/Breadcrumbs";
import NotificationItem from "../../../examples/Items/NotificationItem";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';


import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from "../../../examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
    useMaterialUIController,
    setTransparentNavbar,
    setMiniSidenav,
    setOpenConfigurator,
} from "../../../context";
import { Avatar } from "@mui/material";

function DashboardNavbar({ absolute, light, isMini }) {
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const route = useLocation().pathname.split("/").slice(1);

    useEffect(() => {
        if (fixedNavbar) {
            setNavbarType("sticky");
        } else {
            setNavbarType("static");
        }
        function handleTransparentNavbar() {
            setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        }
        window.addEventListener("scroll", handleTransparentNavbar);

        handleTransparentNavbar();

        return () => window.removeEventListener("scroll", handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    //notifications menu
    const renderMenu = () => (
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            sx={{ mt: 2 }}
        >
            <NotificationItem icon={<NotificationsIcon />} title="an Item here" />
            <NotificationItem icon={<NotificationsIcon />} title="an Item here" />
            <NotificationItem icon={<NotificationsIcon />} title="an Item here" />
        </Menu>
    );

    // Styles for the navbar icons
    const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
        color: () => {
            let colorValue = light || darkMode ? white.main : dark.main;

            if (transparentNavbar && !light) {
                colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
            }

            return colorValue;
        },
    });

    return (
        <AppBar
            position={absolute ? "absolute" : navbarType}
            color="inherit"
            sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon={<HomeIcon />} title={route[route.length - 1]} route={route} light={light} />
                </MDBox>
                {isMini ? null : (
                    <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
                        {console.log("miniSidenav => " + miniSidenav)}
                        {console.log("isMini => " + isMini)}
                        {false ? null :
                            <MDBox pr={1}>
                                <MDInput label="Search here" />
                            </MDBox>
                        }
                        <MDBox color={light ? "white" : "inherit"}>

                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                onClick={handleMiniSidenav}
                            >
                                {miniSidenav ? <MenuOpenIcon sx={iconsStyle} fontSize="medium" />
                                    : <CloseRoundedIcon sx={iconsStyle} fontSize="medium" />
                                }
                            </IconButton>
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                aria-controls="notification-menu"
                                aria-haspopup="true"
                                variant="contained"
                                onClick={handleOpenMenu}
                            >
                                <NotificationsIcon sx={iconsStyle} />
                            </IconButton>
                            {renderMenu()}
                            <IconButton
                                size="small"
                                disableRipple
                                color="inherit"
                                sx={navbarIconButton}
                                onClick={handleConfiguratorOpen}
                            >
                                <SettingsRoundedIcon sx={iconsStyle} />
                            </IconButton>

                            <Link to="/authentication/sign-in/basic">
                                <IconButton size="small" sx={navbarIconButton} disableRipple>
                                    <Avatar sx={{ width: 24, height: 24, iconsStyle }}
                                        src="https://bit.ly/34BY10g" />
                                </IconButton>
                            </Link>
                        </MDBox>
                    </MDBox>
                )}
            </Toolbar>
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;
