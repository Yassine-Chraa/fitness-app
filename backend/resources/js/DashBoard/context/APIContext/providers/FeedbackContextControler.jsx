import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";

const feedbackContext = createContext();

export const useFeedback = () => {
    const context = useContext(feedbackContext);
    if (!context) throw new Error("feedback Provider is missing");
    return context;
};

const feedbackUrl = getUrl("Feedbacks");

export const FeedbackContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);
    const getFeedbacks = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${feedbackUrl}`);
            setFeedbacks(data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getFeedback = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${feedbackUrl}/${id}`);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteFeedback = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${feedbackUrl}/${id}`);
            getFeedbacks();
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
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
