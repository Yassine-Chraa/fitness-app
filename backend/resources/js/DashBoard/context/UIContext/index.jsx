import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
const MaterialUI = createContext();
MaterialUI.displayName = "MaterialUIContext";


const reducer = (state, action) => {
    switch (action.type) {
        case "MINI_SIDENAV": {
            return { ...state, miniSidenav: action.value };
        }
        case "TRANSPARENT_SIDENAV": {
            return { ...state, transparentSidenav: action.value };
        }
        case "WHITE_SIDENAV": {
            return { ...state, whiteSidenav: action.value };
        }
        case "SIDENAV_COLOR": {
            return { ...state, sidenavColor: action.value };
        }
        case "TRANSPARENT_NAVBAR": {
            return { ...state, transparentNavbar: action.value };
        }
        case "FIXED_NAVBAR": {
            return { ...state, fixedNavbar: action.value };
        }
        case "OPEN_CONFIGURATOR": {
            return { ...state, openConfigurator: action.value };
        }
        case "DIRECTION": {
            return { ...state, direction: action.value };
        }
        case "LAYOUT": {
            return { ...state, layout: action.value };
        }
        case "DARKMODE": {
            return { ...state, darkMode: action.value };
        }
        case "OPEN_DELETE_MODAL": {
            return { ...state, openDeleteModalHandler: action.value };
        }
        case "OPEN_EDIT_MODAL": {
            return { ...state, openEditModalHandler: action.value };
        }
        case "OPEN_ADD_MODAL": {
            return { ...state, openAddModalHandler: action.value };
        }
        case "OPEN_VIEW_MODAL": {
            return { ...state, openViewModalHandler: action.value };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        };
    };
};

const MaterialUIControllerProvider = ({ children }) => {
    const initialState = {
        miniSidenav: false,
        transparentSidenav: false,
        whiteSidenav: false,
        sidenavColor: "info",
        transparentNavbar: true,
        fixedNavbar: true,
        openConfigurator: false,
        direction: "ltr",
        layout: "dashboard",
        darkMode: false,
        openDeleteModalHandler: false,
        openEditModalHandler: false,
        openAddModalHandler: false,
        openViewModalHandler: false,
    };

    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

const useMaterialUIController = () => {
    const context = useContext(MaterialUI);

    if (!context) {
        throw new Error(
            "useMaterialUIController should be used inside the MaterialUIControllerProvider."
        );
    }

    return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });
const setOpenDeleteModalHandler = (dispatch, value) => dispatch({ type: "OPEN_DELETE_MODAL", value });
const setOpenEditModalHandler = (dispatch, value) => dispatch({ type: "OPEN_EDIT_MODAL", value });
const setOpenAddModalHandler = (dispatch, value) => dispatch({ type: "OPEN_ADD_MODAL", value });
const setOpenViewModalHandler = (dispatch, value) => dispatch({ type: "OPEN_VIEW_MODAL", value });


export {
    MaterialUIControllerProvider,
    useMaterialUIController,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
    setSidenavColor,
    setTransparentNavbar,
    setFixedNavbar,
    setOpenConfigurator,
    setDirection,
    setLayout,
    setDarkMode,
    setOpenDeleteModalHandler,
    setOpenEditModalHandler,
    setOpenAddModalHandler,
    setOpenViewModalHandler,

};
