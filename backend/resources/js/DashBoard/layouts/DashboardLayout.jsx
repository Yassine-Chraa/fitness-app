import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import MDBox from "../components/MDBox";
import brandWhite from "../assets/images/logo-ct.png";
import brandDark from "../assets/images/logo-ct-dark.png";
import {
    useMaterialUIController,
    setLayout,
    setTransparentSidenav,
    setWhiteSidenav,
    setMiniSidenav,
} from "../context/UIContext";
import Sidenav from "../components/Sidenav";
import { DarkMode } from "@mui/icons-material";
import routes from "../routes";
import Navbar from "../components/Navbar";
import { Message } from "../components/Message";


function DashboardLayout({ children }) {
    const [onMouseEnter, setOnMouseEnter] = useState(false);
    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        sidenavColor,
    } = controller;
    const { pathname } = useLocation();

    useEffect(() => {
        setLayout(dispatch, "dashboard");
    }, [pathname]);
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
    return (
        <MDBox
            sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
                p: 3,
                position: "relative",

                [breakpoints.up("xl")]: {
                    marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
                    transition: transitions.create(
                        ["margin-left", "margin-right"],
                        {
                            easing: transitions.easing.easeInOut,
                            duration: transitions.duration.standard,
                        }
                    ),
                },
            })}
        >
            <Sidenav
                color={sidenavColor}
                brand={
                    (setTransparentSidenav && !DarkMode) || setWhiteSidenav
                        ? brandDark
                        : brandWhite
                }
                brandName="Fitness App"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            />
            <Navbar />
            <MDBox pt={4}>
                {children}
            </MDBox>
        </MDBox>
    );
}

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DashboardLayout;
