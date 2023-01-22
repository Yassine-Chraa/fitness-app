import Dashboard from "./layouts/dashboard";
import Tables from "./layouts/tables";
import Billing from "./layouts/billing";
import RTL from "./layouts/rtl";
import Notifications from "./layouts/notifications";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import DashboardIcon from '@mui/icons-material/Dashboard';

const routes = [
    {
        type: "collapse",
        name: "Home",
        key: "home",
        icon: <DashboardIcon color="error" />,
        route: "/home",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Tables",
        key: "tables",
        icon: <HomeIcon color="secondary" />,
        route: "/tables",
        component: <Tables />,
    },
    {
        type: "collapse",
        name: "Billing",
        key: "billing",
        icon: <HomeIcon color="primary" />,
        route: "/billing",
        component: <Billing />,
    },
    {
        type: "collapse",
        name: "RTL",
        key: "rtl",
        icon: <CalendarMonthIcon color="primary" />,
        route: "/rtl",
        component: <RTL />,
    },
    {
        type: "collapse",
        name: "Notifications",
        key: "notifications",
        icon: <CoronavirusIcon color="warning" />,
        route: "/notifications",
        component: <Notifications />,
    },
    {
        type: "collapse",
        name: "Profile",
        key: "profile",
        icon: <HomeIcon color="primary" />,
        route: "/profile",
        component: <Profile />,
    },
    {
        type: "collapse",
        name: "Sign In",
        key: "sign-in",
        icon: <BubbleChartIcon color="info" />,
        route: "/authentication/sign-in",
        component: <SignIn />,
    },
    {
        type: "collapse",
        name: "Sign Up",
        key: "sign-up",
        icon: <InfoIcon color="success" />,
        route: "/authentication/sign-up",
        component: <SignUp />,
    },
];

export default routes;
