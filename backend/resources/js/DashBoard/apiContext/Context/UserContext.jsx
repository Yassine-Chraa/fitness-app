import { createContext, useContext, useState } from "react";
import { getUrl } from "../API/Helper";

const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};

const UserUrl = getUrl('Users');

//-------------
const currentUser = {
    id: 5,
    role: "client",
    name: "tester",
    email: "tester@gmail.com",
    email_verified_at: null,
    profile: null,
    created_at: "",
    updated_at: "",
    token: "7|QPzOqFEdVNVDavkKBF0wyh0pGyuQIE9uQecRFJaW",
};
//-------------

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.get(`${UserUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoading(false);
        }
    };
    const getUser = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                    id: id,
                },
            };
            const { data } = await axios.get(`${UserUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addUser = async (User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${UserUrl}`, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateUser = async (id, User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${UserUrl}`, id, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteUser = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${UserUrl}`, id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <userContext.Provider
            value={{
                getUsers,
                getUser,
                addUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </userContext.Provider>
    );
};
