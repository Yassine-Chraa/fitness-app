import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";

function RTL() {

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <div>RTL Here</div>
            <Footer />
        </DashboardLayout>
    );
}

export default RTL;
