import { useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDAvatar from "../MDAvatar";
import SidenavCollapse from "../../components/Sidenav/SidenavCollapse";
import SidenavRoot from "../../components/Sidenav/SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import {
    useMaterialUIController,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
} from "../../context/UIContext";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
        controller;
    const location = useLocation();
    const collapseName = location.pathname.replace("/", "");

    let textColor = "primary";

    if (transparentSidenav || (whiteSidenav && !darkMode)) {
        textColor = "dark";
    } else if (whiteSidenav && darkMode) {
        textColor = "primary";
    }

    const closeSidenav = () => setMiniSidenav(dispatch, true);

    useEffect(() => {
        // A function that sets the mini state of the sidenav.
        function handleMiniSidenav() {
            setMiniSidenav(dispatch, window.innerWidth < 1200);
            setTransparentSidenav(
                dispatch,
                window.innerWidth < 1200 ? false : transparentSidenav
            );
            setWhiteSidenav(
                dispatch,
                window.innerWidth < 1200 ? false : whiteSidenav
            );
        }

        /**
        The event listener that's calling the handleMiniSidenav function when resizing the window.
        */
        window.addEventListener("resize", handleMiniSidenav);

        // Call the handleMiniSidenav function to set the state with the initial value.
        handleMiniSidenav();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleMiniSidenav);
    }, [dispatch, location]);

    // Render all the routes from the routes.js (All the visible items on the Sidenav)
    const renderRoutes = routes.map(
        ({ type, name, icon, title, noCollapse, key, href, route }) => {
            let returnValue;

            if (type === "collapse") {
                returnValue = href ? (
                    <Link
                        href={href}
                        key={key}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ textDecoration: "none" }}
                    >
                        <SidenavCollapse
                            name={name}
                            icon={icon}
                            active={key === collapseName}
                            noCollapse={noCollapse}
                        />
                    </Link>
                ) : (
                    <NavLink key={key} to={route}>
                        <SidenavCollapse
                            name={name}
                            icon={icon}
                            active={key === collapseName}
                        />
                    </NavLink>
                );
            } else if (type === "title") {
                returnValue = (
                    <MDTypography
                        key={key}
                        color={textColor}
                        display="block"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="uppercase"
                        pl={3}
                        mt={2}
                        mb={1}
                        ml={1}
                    >
                        {title}
                    </MDTypography>
                );
            } else if (type === "divider") {
                returnValue = (
                    <Divider
                        key={key}
                        light={
                            (!darkMode &&
                                !whiteSidenav &&
                                !transparentSidenav) ||
                            (darkMode && !transparentSidenav && whiteSidenav)
                        }
                    />
                );
            }
            return returnValue;
        }
    );

    const logout = (e) => {
        e.preventDefault();
        document.getElementById("logout-form").submit();
    };
    return (
        <SidenavRoot
            {...rest}
            variant="permanent"
            ownerState={{
                transparentSidenav,
                whiteSidenav,
                miniSidenav,
                darkMode,
            }}
        >
            <MDBox pt={3} pb={1} px={4} textAlign="center">
                <MDBox
                    display={{ xs: "block", xl: "none" }}
                    position="absolute"
                    top={0}
                    right={0}
                    p={1.625}
                    onClick={closeSidenav}
                    sx={{ cursor: "pointer" }}
                >
                    <MDTypography variant="h6" color="secondary">
                        <CloseRoundedIcon color="error" fontSize="medium" />
                    </MDTypography>
                </MDBox>
                <MDBox
                    component={NavLink}
                    to="/"
                    display="flex"
                    alignItems="center"
                >
                    {brand && (
                        <MDBox
                            component="img"
                            src={brand}
                            alt="Brand"
                            width="2rem"
                        />
                    )}
                    <MDBox
                        width={!brandName && "100%"}
                        sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
                    >
                        <MDTypography
                            component="h6"
                            variant="button"
                            fontWeight="medium"
                            color={textColor}
                        >
                            {brandName}
                        </MDTypography>
                    </MDBox>
                </MDBox>
            </MDBox>
            <Divider
                light={
                    (!darkMode && !whiteSidenav && !transparentSidenav) ||
                    (darkMode && !transparentSidenav && whiteSidenav)
                }
            />
            <List>{renderRoutes}</List>

            <MDBox
                href="/home"
                p={2}
                mt="auto"
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                shadow="lg"
            >
                {miniSidenav ? null : (
                    <>
                        <NavLink to="">
                            <MDAvatar
                                src={localStorage.getItem("user_profile")}
                                alt="Avatar"
                                variant="rounded"
                                size="sm"
                            />
                        </NavLink>
                        <MDBox size="3">
                            <MDTypography
                                fontSize={12}
                                fontWeight="bold"
                                variant="h6"
                                color={textColor}
                            >
                                {localStorage.getItem("user_name")}
                            </MDTypography>
                            <MDTypography
                                fontSize={8}
                                fontWeight="light"
                                variant="subtitle1"
                                color={textColor}
                            >
                                {localStorage.getItem("user_role")}
                            </MDTypography>
                        </MDBox>
                    </>
                )}
                <a href="/logout" onClick={(e) => logout(e)}>
                    <LogoutIcon color={textColor} />
                </a>
                <form
                    id="logout-form"
                    action="/logout"
                    method="POST"
                    style={{ display: "none" }}
                >
                    <input
                        type="hidden"
                        name="_token"
                        value={
                            document.querySelector("meta[name=csrf-token]")
                                .content
                        }
                    ></input>
                </form>
            </MDBox>
        </SidenavRoot>
    );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
    color: "info",
    brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
    ]),
    brand: PropTypes.string,
    brandName: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
