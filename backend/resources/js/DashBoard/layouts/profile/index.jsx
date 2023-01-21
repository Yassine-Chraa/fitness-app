import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";

function Overview() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div>Profile here</div>

            <Footer />
        </DashboardLayout>
    );
}

export default Overview;
