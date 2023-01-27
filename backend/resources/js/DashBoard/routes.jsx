import Dashboard from "./pages/Dashboard";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Users from "./pages/Users";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainApp from "./pages/MainApp";

const routes = [
    {
        type: "collapse",
        name: "DashBoard",
        key: "dashboard",
        icon: <DashboardIcon />,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "MainApp",
        key: "main-app",
        icon: <DashboardIcon />,
        route: "/main-app",
        component: <MainApp />,
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <GroupIcon />,
        route: "/users",
        component: <Users />,
    },
    {
        type: "collapse",
        name: "Sign-in",
        key: "sign-in",
        icon: <GroupIcon />,
        route: "/sign-in",
        component: <SignIn />,
    },
    {
        type: "collapse",
        name: "Sign-up",
        key: "sign-up",
        icon: <GroupIcon />,
        route: "/sign-up",
        component: <SignUp />,
    },
];

export default routes;
