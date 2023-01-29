import Home from "./views/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';

const routes = [
    {
        type: "collapse",
        name: "Home",
        key: "",
        icon: <DashboardIcon />,
        route: "/mainApp",
        component: <Home />,
    },
];

export default routes;
