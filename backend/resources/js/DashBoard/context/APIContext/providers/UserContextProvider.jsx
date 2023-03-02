import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    width: "max-content",
    padding: "8px 16px",
    background: "#5F8D4E",
    color: "#fff",
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

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

    const getUsers = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}`);
            setLoadingAnimation(dispatch, false);
            setUsers(data);
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
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
                const { data } = await axios.post(
                    "http://127.0.0.1:8000/api/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                res = await axios.post(`${UserUrl}`, {
                    ...User,
                    profile: data.img_url,
                });
            } else {
                res = await axios.post(`${UserUrl}`, User);
            }

            setLoadingAnimation(dispatch, false);
            getUsers();
            Toast.fire({
                icon: "success",
                title: "User Stored",
            });
            return res.data.message;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const updateUser = async (id, User, imageFile) => {
        try {
            let res;
            setLoadingAnimation(dispatch, true);
            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);
                const { data } = await axios.post(
                    "http://127.0.0.1:8000/api/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                res = await axios.put(`${UserUrl}/${id}`, {
                    ...User,
                    profile: data.img_url,
                });
            } else {
                res = await axios.put(`${UserUrl}/${id}`, User);
            }
            setLoadingAnimation(dispatch, false);
            getUsers();
            Toast.fire({
                icon: "success",
                title: "User Updated",
            });
            return res.data.message;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
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

                    Toast.fire({
                        icon: "success",
                        title: "User Deleted",
                    });
                    getUsers();
                    return data;
                } catch (error) {
                    console.log(error);
                    alert(error);
                    setLoadingAnimation(dispatch, false);
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
                getTotal
            }}
        >
            {children}
        </userContext.Provider>
    );
};
