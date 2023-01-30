import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "./routes";

export default function App() {
    const { pathname } = useLocation();


    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return (
                    <Route
                        exact
                        path={route.route}
                        element={route.component}
                        key={route.key}
                    />
                );
            }

            return null;
        });

    return (
        <Routes>
            <Route path="*" element={<Navigate to="/home" />} />
            {getRoutes(routes)}
        </Routes>
    );
}
