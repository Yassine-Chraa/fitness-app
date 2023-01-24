import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";

const Breadcrumbs = ({ icon, title, route, light }) => {
    const routes = route.slice(0, -1);

    return (
        <MDBox mr={{ xs: 0, xl: 8 }}>
            <MuiBreadcrumbs
                sx={{
                    "& .MuiBreadcrumbs-separator": {
                        color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
                    },
                }}
            >
                <Link to="/">
                    <MDTypography
                        component="span"
                        variant="body2"
                        color={light ? "white" : "dark"}
                        opacity={light ? 0.8 : 0.5}
                        sx={{ lineHeight: 0 }}
                    >
                        {icon}
                    </MDTypography>
                </Link>
                {routes.map((el) => (
                    <Link to={`/${el}`} key={el}>
                        <MDTypography
                            component="span"
                            variant="button"
                            fontWeight="regular"
                            textTransform="capitalize"
                            color={light ? "white" : "dark"}
                            opacity={light ? 0.8 : 0.5}
                            sx={{ lineHeight: 0 }}
                        >
                            {el}
                        </MDTypography>
                    </Link>
                ))}
                <MDTypography
                    variant="button"
                    fontWeight="regular"
                    textTransform="capitalize"
                    color={light ? "white" : "dark"}
                    sx={{ lineHeight: 0 }}
                >
                    {title.replace("-", " ")}
                </MDTypography>
            </MuiBreadcrumbs>
            <MDTypography
                fontWeight="bold"
                textTransform="capitalize"
                variant="h6"
                color={light ? "white" : "dark"}
                noWrap
            >
                {title.replace("-", " ")}
            </MDTypography>
        </MDBox>
    );
}

Breadcrumbs.defaultProps = {
    light: false,
};

Breadcrumbs.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    light: PropTypes.bool
};

export default Breadcrumbs;
