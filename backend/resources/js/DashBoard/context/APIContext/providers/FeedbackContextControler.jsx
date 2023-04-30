import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";
import { setLoadingAnimation, setMessageObject, useMaterialUIController } from "../../UIContext";
import Swal from "sweetalert2";

const feedbackContext = createContext();

export const useFeedback = () => {
    const context = useContext(feedbackContext);
    if (!context) throw new Error("feedback Provider is missing");
    return context;
};

const feedbackUrl = getUrl("Feedbacks");

export const FeedbackContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();
    const [feedbacks, setFeedbacks] = useState([]);
    const getFeedbacks = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${feedbackUrl}`);
            setFeedbacks(data);
            setLoadingAnimation(dispatch, false);

        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const getFeedback = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${feedbackUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const deleteFeedback = async (id) => {
        Swal.fire({
            title: "Are you sure to delete feedback",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            width: "max-content",
            padding: "8px 16px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoadingAnimation(dispatch, true);
                    const { data } = await axios.delete(`${feedbackUrl}/${id}`);
                    getFeedbacks();
                    setLoadingAnimation(dispatch, false);
                    setMessageObject(dispatch, {
                        type: "success",
                        message: data.message,
                        state: "mount",
                    });
                    return data;
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
        <feedbackContext.Provider
            value={{
                getFeedbacks,
                feedbacks,
                getFeedback,
                deleteFeedback,
            }}
        >
            {children}
        </feedbackContext.Provider>
    );
};
