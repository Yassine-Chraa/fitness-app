import { createContext, useContext, useState } from "react";
import { getUrl } from "../API/Helper";

const activityContext = createContext();

export const useActivity = () => {
    const context = useContext(activityContext);
    if (!context) throw new Error("Activity Provider is missing");
    return context;
};

const ActivityUrl = getUrl("Activitys");

//-------------
const currentUser = {
    id: 1,
    role: "admin",
    name: "Yassine Chraa",
    email: "yassinechraa@gmail.com",
    email_verified_at: null,
    profile: null,
    created_at: "",
    updated_at: "",
    token: "1|3pkkXlSGZA8Kh7qbuVruzoFbPKbeiJvKepE8Ey3U",
};
//-------------

export const ActivityContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getActivitys = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
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
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${ActivityUrl}`,id, config);
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
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${ActivityUrl}`, Activity, config);
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
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${ActivityUrl}`, id, Activity, config);
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
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${ActivityUrl}`,id, config);
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
                getActivitys,
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
