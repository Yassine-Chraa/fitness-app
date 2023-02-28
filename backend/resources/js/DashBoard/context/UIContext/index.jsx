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
        case "OPEN_FORM": {
            return { ...state, openFormHandler: action.value };
        }
        case "OPEN_USER_VIEW": {
            return { ...state, openUserViewHandler: action.value };
        }
        case "OPEN_ALERT_MESSAGE": {
            return { ...state, messageObject: action.value };
        }
        case "SET_LOADING_ANIMATION": {
            return { ...state, loadingAnimation: action.value };
        }
        case "SET_RELAOD_DATA": {
            return { ...state, reLoadData: action.value };
        }
        case "OPEN_PROGRAM_DELETE_MODAL": {
            return { ...state, openDeleteProgramModalHandler: action.value };
        }
        case "OPEN_PROGRAM_EDIT_MODAL": {
            return { ...state, openEditProgramModalHandler: action.value };
        }
        case "OPEN_PROGRAM_ADD_MODAL": {
            return { ...state, openAddProgramModalHandler: action.value };
        }
        case "OPEN_PROGRAM_VIEW_MODAL": {
            return { ...state, openProgramViewHandler: action.value };
        }
        //----------------------------------------------------------
        case "OPEN_ACTIVITY_DELETE_MODAL": {
            return { ...state, openDeleteActivityModalHandler: action.value };
        }
        case "OPEN_ACTIVITY_EDIT_MODAL": {
            return { ...state, openEditActivityModalHandler: action.value };
        }
        case "OPEN_ACTIVITY_ADD_MODAL": {
            return { ...state, openAddActivityModalHandler: action.value };
        }
        case "OPEN_ACTIVITY_VIEW_MODAL": {
            return { ...state, openActivityViewHandler: action.value };
        }
        //----------------------------------------------------------
        case "OPEN_EXERCISE_DELETE_MODAL": {
            return { ...state, openDeleteExerciseModalHandler: action.value };
        }
        case "OPEN_EXERCISE_EDIT_MODAL": {
            return { ...state, openEditExerciseModalHandler: action.value };
        }
        case "OPEN_EXERCISE_ADD_MODAL": {
            return { ...state, openAddExerciseModalHandler: action.value };
        }
        case "OPEN_EXERCISE_VIEW_MODAL": {
            return { ...state, openExerciseViewHandler: action.value };
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
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
        openFormHandler: false,
        openUserViewHandler: false,

        openDeleteModalHandler: false,
        openEditModalHandler: false,
        openAddModalHandler: false,
        openUserViewHandler: false,

        openDeleteProgramModalHandler: false,
        openEditProgramModalHandler: false,
        openAddProgramModalHandler: false,
        openProgramViewHandler: false,

        openDeleteActivityModalHandler: false,
        openEditActivityModalHandler: false,
        openAddActivityModalHandler: false,
        openActivityViewHandler: false,

        openDeleteExerciseModalHandler: false,
        openEditExerciseModalHandler: false,
        openAddExerciseModalHandler: false,
        openExerciseViewHandler: false,


        messageObject: { type: 'error', message: 'there is an error !', state: false },
        loadingAnimation: false,
        reLoadData: false,
    };

    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
};

const useMaterialUIController = () => {
    const context = useContext(MaterialUI);

    if (!context) {
        throw new Error(
            "useMaterialUIController should be used inside the MaterialUIControllerProvider."
        );
    }

    return context;
};

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
const setOpenFormHandler = (dispatch, value) => dispatch({ type: "OPEN_FORM", value });

const setOpenDeleteModalHandler = (dispatch, value) => dispatch({ type: "OPEN_DELETE_MODAL", value });
const setOpenEditModalHandler = (dispatch, value) => dispatch({ type: "OPEN_EDIT_MODAL", value });
const setOpenAddModalHandler = (dispatch, value) => dispatch({ type: "OPEN_ADD_MODAL", value });

const setMessageObject = (dispatch, value) => dispatch({ type: "OPEN_ALERT_MESSAGE", value });
const setLoadingAnimation = (dispatch, value) => dispatch({ type: "SET_LOADING_ANIMATION", value });
const setReloadData = (dispatch, value) => dispatch({ type: "SET_RELAOD_DATA", value });

const setOpenDeleteProgramModalHandler = (dispatch, value) => dispatch({ type: "OPEN_PROGRAM_DELETE_MODAL", value });
const setOpenEditProgramModalHandler = (dispatch, value) => dispatch({ type: "OPEN_PROGRAM_EDIT_MODAL", value });
const setOpenAddProgramModalHandler = (dispatch, value) => dispatch({ type: "OPEN_PROGRAM_ADD_MODAL", value });
const setOpenProgramViewHandler = (dispatch, value) => dispatch({ type: "OPEN_PROGRAM_VIEW_MODAL", value });

const setOpenDeleteActivityModalHandler = (dispatch, value) => dispatch({ type: "OPEN_ACTIVITY_DELETE_MODAL", value });
const setOpenEditActivityModalHandler = (dispatch, value) => dispatch({ type: "OPEN_ACTIVITY_EDIT_MODAL", value });
const setOpenAddActivityModalHandler = (dispatch, value) => dispatch({ type: "OPEN_ACTIVITY_ADD_MODAL", value });
const setOpenActivityViewHandler = (dispatch, value) => dispatch({ type: "OPEN_ACTIVITY_VIEW_MODAL", value });

const setOpenDeleteExerciseModalHandler = (dispatch, value) => dispatch({ type: "OPEN_EXERCISE_DELETE_MODAL", value });
const setOpenEditExerciseModalHandler = (dispatch, value) => dispatch({ type: "OPEN_EXERCISE_EDIT_MODAL", value });
const setOpenAddExerciseModalHandler = (dispatch, value) => dispatch({ type: "OPEN_EXERCISE_ADD_MODAL", value });
const setOpenExerciseViewHandler = (dispatch, value) => dispatch({ type: "OPEN_EXERCISE_VIEW_MODAL", value });


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
    setOpenFormHandler,

    setOpenDeleteModalHandler,
    setOpenEditModalHandler,
    setOpenAddModalHandler,

    setOpenDeleteProgramModalHandler,
    setOpenEditProgramModalHandler,
    setOpenAddProgramModalHandler,
    setOpenProgramViewHandler,

    setOpenDeleteActivityModalHandler,
    setOpenEditActivityModalHandler,
    setOpenAddActivityModalHandler,
    setOpenActivityViewHandler,

    setOpenDeleteExerciseModalHandler,
    setOpenEditExerciseModalHandler,
    setOpenAddExerciseModalHandler,
    setOpenExerciseViewHandler,

    setMessageObject,
    setLoadingAnimation,
    setReloadData,
};
