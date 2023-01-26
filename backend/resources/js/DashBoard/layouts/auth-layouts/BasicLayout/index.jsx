import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "../../../components/MDBox";
import DefaultNavbar from "../../../components/DefaultNavBar";
import PageLayout from "../../PageLayout";
import Footer from "../Footer";

function BasicLayout({ image, children }) {
    return (
        <PageLayout>
            <MDBox
                position="absolute"
                width="100%"
                minHeight="100vh"
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        image &&
                        `${linearGradient(
                            rgba(gradients.dark.main, 0.6),
                            rgba(gradients.dark.state, 0.6)
                        )}, url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            />
            <MDBox p={2} width="100%" height="100%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {children}
            </MDBox>
        </PageLayout>
    );
}


BasicLayout.propTypes = {
    image: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default BasicLayout;
