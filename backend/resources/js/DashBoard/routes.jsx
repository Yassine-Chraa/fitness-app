import Dashboard from "./pages/Dashboard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Users from "./pages/Users";

const routes = [
    {
        type: "collapse",
        name: "Home",
        key: "home",
        icon: <DashboardIcon  />,
        route: "/home",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <GroupIcon/>,
        route: "/users",
        component: <Users />,
    },
];

export default routes;
