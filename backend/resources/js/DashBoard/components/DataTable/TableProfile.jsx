import MDAvatar from "../MDAvatar";
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";

const Profile = ({ image, name, subtitle }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={image} size="sm" />
        <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
                {name}
            </MDTypography>
            <MDTypography variant="caption">{subtitle}</MDTypography>
        </MDBox>
    </MDBox>
);
export default Profile;
