import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";

function RTL() {

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <MDTypography>rtl Page here</MDTypography>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default RTL;
