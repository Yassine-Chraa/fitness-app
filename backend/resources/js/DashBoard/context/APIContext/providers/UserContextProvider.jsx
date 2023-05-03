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
const uploadUrl = getUrl("Upload");

export const UserContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();
    const [users, setUsers] = useState([]);

    console.log("user url : ");
    console.log(localStorage.getItem('api_token'));

    const getUsers = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}`);
            setLoadingAnimation(dispatch, false);
            setUsers(data);
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };

    const getUser = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
            return false;
        }
    };

    const addUser = async (User, imageFile) => {
        try {
            let res;
            setLoadingAnimation(dispatch, true);
            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);
                const { data } = await axios.post(uploadUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                res = await axios.post(`${UserUrl}`, {
                    ...User,
                    profile: data.img_url,
                });
            } else {
                res = await axios.post(`${UserUrl}`, User);
            }
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: "User Created successfully",
                state: "mount",
            });
            getUsers();
            return res.data.message;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };

    const updateUser = async (id, User, imageFile) => {
        try {
            let res;
            setLoadingAnimation(dispatch, true);
            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);
                const { data } = await axios.post(uploadUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                res = await axios.put(`${UserUrl}/${id}`, {
                    ...User,
                    profile: data.img_url,
                });
            } else {
                res = await axios.put(`${UserUrl}/${id}`, User);
            }
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: "User updated successfully",
                state: "mount",
            });
            getUsers();
            return true;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
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
                    setMessageObject(dispatch, {
                        type: "success",
                        message: "User deleted successfully",
                        state: "mount",
                    });
                    getUsers();
                } catch (error) {
                    console.log(error);
                    alert(error);
                    setLoadingAnimation(dispatch, false);
                    setMessageObject(dispatch, {
                        type: "error",
                        message: "Something Went wrong !",
                        state: "mount",
                    });
                }
            }
        });
    };
    const getTotal = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}/total`);
            setLoadingAnimation(dispatch, false);
            return data.total;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            return false;
        }
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
                getTotal,
            }}
        >
            {children}
        </userContext.Provider>
    );
};
