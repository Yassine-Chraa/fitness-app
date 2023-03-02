import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { Icon } from "@mui/material";
import Products from "./pages/Products";
import Feedbacks from "./pages/Feedbacks";
import TodayIcon from '@mui/icons-material/Today';
import Programs from "./pages/Programs";

const routes = [
    {
        type: "collapse",
        name: "DashBoard",
        key: "",
        icon: <Icon>dashboard</Icon>,
        route: "/dashboard",
        component: <Dashboard />,
    },
    {
        type: "collapse",
        name: "Users",
        key: "users",
        icon: <Icon>group</Icon>,
        route: "/dashboard/users",
        component: <Users />,
    },
    {
        type: "collapse",
        name: "Products",
        key: "products",
        icon: <Icon>store</Icon>,
        route: "/dashboard/products",
        component: <Products />,
    },
    {
        type: "collapse",
        name: "Programs",
        key: "programs",
        icon: <TodayIcon/>,
        route: "/dashboard/programs",
        component: <Programs />,
    },
    {
        type: "collapse",
        name: "Feedbacks",
        key: "feedbacks",
        icon: <Icon>reviews</Icon>,
        route: "/dashboard/feedbacks",
        component: <Feedbacks />,
    },
];

export default routes;
