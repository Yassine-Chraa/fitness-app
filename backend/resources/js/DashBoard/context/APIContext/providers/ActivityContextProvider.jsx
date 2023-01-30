import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";

const activityContext = createContext();

export const useActivity = () => {
    const context = useContext(activityContext);
    if (!context) throw new Error("Activity Provider is missing");
    return context;
};

const ActivityUrl = getUrl("Activities");

export const ActivityContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getActivities = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "api_token"
                    )}`,
                },
            };

            const { data } = await axios.get(`${ActivityUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getActivity = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "api_token"
                    )}`,
                },
            };
            const { data } = await axios.get(`${ActivityUrl}`, id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addActivity = async (Activity) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "api_token"
                    )}`,
                },
            };
            const { data } = await axios.post(
                `${ActivityUrl}`,
                Activity,
                config
            );
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateActivity = async (id, Activity) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "api_token"
                    )}`,
                },
            };
            const { data } = await axios.put(
                `${ActivityUrl}`,
                id,
                Activity,
                config
            );
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteActivity = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem(
                        "api_token"
                    )}`,
                },
            };
            const { data } = await axios.get(`${ActivityUrl}`, id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <activityContext.Provider
            value={{
                getActivities,
                getActivity,
                addActivity,
                updateActivity,
                deleteActivity,
            }}
        >
            {children}
        </activityContext.Provider>
    );
};
