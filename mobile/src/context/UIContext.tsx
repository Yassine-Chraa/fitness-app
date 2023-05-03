import React, { useMemo, useReducer, useContext, createContext } from 'react';
import CheckStateType from '../types/CheckStateType';
const ReactNativeUI = createContext<Array<any>>([]);

ReactNativeUI.displayName = "ReactNativeUIContext";

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_LOAD_ANIMATION": {
            return { ...state, isLoading: action.value };
        }
        case "IS_CHECK_STATE_OK": {
            return { ...state, checkState: action.value };
        }
        case "SET_IS_ERROR": {
            return { ...state, isError: action.value };
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};


const _CHECK_STATE_:CheckStateType = {
    isCheck: false,
    isSuccess: false,
    message: '',
};


const UIControllerProvider = ({ children }: any): JSX.Element => {
    const initialState = {
        isLoading: false,
        isFailedCheck: false,
        checkState: _CHECK_STATE_,

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
const setIsCheckStateOk = (dispatch: any, value: any) => dispatch({ type: "IS_CHECK_STATE_OK", value });
const setIsError = (dispatch: any, value: any) => dispatch({ type: "SET_IS_ERROR", value });


export {
    UIControllerProvider,
    useUIController,
    setLoadAnimation,
    setIsCheckStateOk,
    setIsError,
};
