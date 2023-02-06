import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";

const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};

const UserUrl = getUrl('Users');

export const UserContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    //-------------> perfect
    const getUsers = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };

            const { data } = await axios.get(`${UserUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            alert(UserUrl)
            setLoading(false);
        }
    };
    //-------------> perfect
    const getUser = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${UserUrl}/${id}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoading(false);
        }
    };
    //-------------> perfect
    const addUser = async (User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            alert("before")
            const { data } = await axios.post(`${UserUrl}`, User, config);
            console.log(JSON.stringify(data))
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoading(false);
        }
    };
    //-------------> perfect
    const updateUser = async (User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.put(`${UserUrl}/${User.id}`, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.delete(`${UserUrl}/${id}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
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
