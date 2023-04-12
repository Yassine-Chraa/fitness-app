import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation, setMessageObject } from "../../UIContext";
import { getUrl } from "../Helper";
import Swal from "sweetalert2";


const exerciseContext = createContext();

export const useExercise = () => {
    const context = useContext(exerciseContext);
    if (!context) throw new Error("Exercise Provider is missing");
    return context;
};

const ExerciseUrl = getUrl('Exercises');
const uploadUrl = getUrl("Upload");

export const ExerciseContextProvider = ({ children }) => {

    const [exercises,setExercises] = useState([]);
    const [controller, dispatch] = useMaterialUIController();

    const getExercises = async () => {
        try {
            setLoadingAnimation(dispatch, true);

            const { data } = await axios.get(`${ExerciseUrl}`);
            setLoadingAnimation(dispatch, false);
            console.log(data);
            setExercises(data)
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const getExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ExerciseUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };
    const addExercise = async (Exercise,imageFile) => {
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
                res = await axios.post(`${ExerciseUrl}`, {...Exercise,img: data.img_url});
            } else {
                res = await axios.post(`${ExerciseUrl}`, Exercise);
            }

            getExercises()
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: res.data.message,
                state: "mount",
            });
            return true;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };
    const updateExercise = async (selectedID,Exercise,imageFile) => {
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
                res =  await axios.put(`${ExerciseUrl}/${selectedID}`, {...Exercise,img:data.img_url});
            } else {
                res = await axios.put(`${ExerciseUrl}/${selectedID}`, Exercise);
            }

            getExercises();
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: res.data.message,
                state: "mount",
            });

            return true;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };

    const deleteExercise = async (id) => {
        Swal.fire({
            title: "Are you sure to delete exercise",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            width: "max-content",
            padding: "8px 16px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoadingAnimation(dispatch, true);
                    const { data } = await axios.delete(`${ExerciseUrl}/${id}`);
                    getExercises();
                    setLoadingAnimation(dispatch, false);
                    setMessageObject(dispatch, {
                        type: "success",
                        message: data.message,
                        state: "mount",
                    });
                } catch (error) {
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

    return (
        <exerciseContext.Provider
            value={{
                exercises,
                getExercises,
                getExercise,
                addExercise,
                updateExercise,
                deleteExercise,
            }}
        >
            {children}
        </exerciseContext.Provider>
    );
};
