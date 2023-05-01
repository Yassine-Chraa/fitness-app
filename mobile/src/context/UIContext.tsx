import React, { useMemo, useReducer, useContext, createContext } from 'react';
import UserInfo from '../types/UserInfo';
const ReactNativeUI = createContext<Array<any>>([]);

ReactNativeUI.displayName = "ReactNativeUIContext";

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_LOAD_ANIMATION": {
            return { ...state, isLoading: action.value };
        }
        case "SET_CURRENT_USER": {
            return { ...state, currentUser: action.value };
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};


const _USER_: UserInfo = {
    ratings: [],
    token: '',
}

const UIControllerProvider = ({ children }: any): JSX.Element => {
    const initialState = {
        isLoading: false,
        currentUser: _USER_,
    };

    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return <ReactNativeUI.Provider value={value}>{children}</ReactNativeUI.Provider>;
};

const useUIController = () => {
    const context = useContext(ReactNativeUI);

    if (!context) {
        throw new Error(
            "useUIController should be used inside the ReactNativeUIControllerProvider."
        );
    }

    return context;
};

const setLoadAnimation = (dispatch: any, value: any) => dispatch({ type: "SET_LOAD_ANIMATION", value });
const setCurrentUser = (dispatch: any, value: any) => dispatch({ type: "SET_CURRENT_USER", value });


export {
    UIControllerProvider,
    useUIController,
    setLoadAnimation,
    setCurrentUser,
};
