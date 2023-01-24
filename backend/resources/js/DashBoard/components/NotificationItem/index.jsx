import { forwardRef } from "react";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import menuItem from "../NotificationItem/styles";

console.log("notifications")

const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
        <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
            <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
                {icon}
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
                {title}
            </MDTypography>
        </MDBox>
    </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default NotificationItem;
