import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { Icon } from "@mui/material";
import Products from "./pages/Products";
import Feedbacks from "./pages/Feedbacks";
import Programs from "./pages/Programs";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Users/Profile";
import ProductDetails from "./pages/Products/ProductDetails";
import ExerciseDetails from "./pages/Exercises/ExerciseDetails";
import EditProgram from "./pages/Programs/EditProgram";
import EditWorkOut from "./pages/Programs/EditProgram/WorkOuts/EditWorkOut";
import { Navigate } from "react-router-dom";

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
        name: null,
        key: "profile",
        icon: null,
        route: "/dashboard/users/:id",
        component: <Profile />,
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
        name: null,
        key: "ProductDetails",
        icon: null,
        route: "/dashboard/products/:id",
        component: <ProductDetails />,
    },
    {
        type: "collapse",
        name: "Exercises",
        key: "exercises",
        icon: <Icon>fitness_center</Icon>,
        route: "/dashboard/exercises",
        component: <Exercises />,
    },
    {
        type: "collapse",
        name: null,
        key: "ExerciseDetails",
        icon: null,
        route: "/dashboard/exercises/:id",
        component: <ExerciseDetails />,
    },
    {
        type: "collapse",
        name: "Programs",
        key: "programs",
        icon: <Icon>today</Icon>,
        route: "/dashboard/programs",
        component: <Programs />,
    },
    {
        type: "collapse",
        name: null,
        key: "EditProgram",
        icon: null,
        route: "/dashboard/Programs/:programID",
        component: <EditProgram />,
    },
    {
        type: "collapse",
        name: null,
        key: "EditWorkout",
        icon: null,
        route: "/dashboard/Programs/:programID/workout/:workOutID",
        component: <EditWorkOut />,
    },
    {
        type: "collapse",
        name: "Feedbacks",
        key: "feedbacks",
        icon: <Icon>reviews</Icon>,
        route: "/dashboard/feedbacks",
        component: <Feedbacks />,
    },
    {
        type: "collapse",
        name: null,
        key: "",
        icon: null,
        route: "*",
        component: <Navigate to="/dashboard" />,
    },
];

export default routes;
