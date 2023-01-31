import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { Icon } from "@mui/material";
import Products from "./pages/Products";
import Meals from "./pages/Meals";
import Equipements from "./pages/Equipements";
import Activities from "./pages/Activities";
import Feedbacks from "./pages/Feedbacks";

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
        name: "Meals",
        key: "meals",
        icon: <Icon>restaurant</Icon>,
        route: "/dashboard/meals",
        component: <Meals />,
    },
    {
        type: "collapse",
        name: "Equipements",
        key: "equipements",
        icon: <Icon>fitness_center</Icon>,
        route: "/dashboard/equipements",
        component: <Equipements />,
    },
    {
        type: "collapse",
        name: "Activities",
        key: "activities",
        icon: <Icon>timeline</Icon>,
        route: "/dashboard/activities",
        component: <Activities />,
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
