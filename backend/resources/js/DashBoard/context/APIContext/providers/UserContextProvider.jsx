import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";
import { setMessageObject } from "../../UIContext";
import Swal from "sweetalert2";

const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};

const UserUrl = getUrl("Users");

export const UserContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();
    const [users, setUsers] = useState([]);

    //-------------> perfect
    const getUsers = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}`);
            setLoadingAnimation(dispatch, false);
            setUsers(data);
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, { type: 'error', message: 'Something Went wrong !', state: 'mount' });
        }
    };
    //-------------> perfect
    const getUser = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, { type: 'error', message: 'Something Went wrong !', state: 'mount' });
            return false;
        }
    };
    //-------------> perfect
    const addUser = async (User) => {
        try {
            setLoadingAnimation(dispatch, true);
            console.log(User)
            console.log(localStorage.getItem('api_token'))
            const { data } = await axios.post(`${UserUrl}`, User);
            setLoadingAnimation(dispatch, false);
            getUsers();
            setMessageObject(dispatch, { type: 'success', message: 'User Created successfully', state: 'mount' })
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, { type: 'error', message: 'Something Went wrong !', state: 'mount' });
        }
    };
    //-------------> perfect
    const updateUser = async (User) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.put(`${UserUrl}/${User.id}`, User);
            setLoadingAnimation(dispatch, false);
            getUsers();
            setMessageObject(dispatch, { type: 'success', message: 'User was Updated successfully', state: 'mount' })
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, { type: 'error', message: 'Something Went wrong !', state: 'mount' });
        }
    };

    const deleteUser = async (id) => {
        Swal.fire({
            title: "Are you sure to delete user",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            width: "max-content",
            padding: "8px 16px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoadingAnimation(dispatch, true);
                    const { data } = await axios.delete(`${UserUrl}/${id}`);
                    setLoadingAnimation(dispatch, false);
                    setMessageObject(dispatch, { type: 'success', message: 'User was Deleted successfully', state: 'mount' })
                    getUsers();
                    return data;
                } catch (error) {
                    console.log(error);
                    alert(error);
                    setLoadingAnimation(dispatch, false);
                    setMessageObject(dispatch, { type: 'error', message: 'Something Went wrong !', state: 'mount' });
                }
            }
        });
    };

    return (
        <userContext.Provider
            value={{
                users,
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
