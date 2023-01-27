import MDBox from "../../components/MDBox";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashBoardNavBar from "../../components/DashBoardNavBar";
import Footer from "../../components/Footer";
import MDTypography from "../../components/MDTypography";


const MainApp = () => {


    return (
        <DashboardLayout>
            <DashBoardNavBar />
            <MDBox py={3}>
                <MDTypography m={2} p={2}>Main App Here</MDTypography>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
};

export default MainApp;
