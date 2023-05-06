import axios from '../../Helpers/axiosConfig';
import  React,{ createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';

export type CoachContextType = {
    coaches: Array<any>;
    getCoaches: () => Promise<void>;
};
const coachContext = createContext<CoachContextType | null>(null);

export const useCoach = () => {
    const context = useContext(coachContext);
    if (!context) throw new Error('Coach Provider is missing');
    return context;
};

const coachUrl = getUrl('Users');

export const CoachContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const [coaches, setCoaches] = useState([])
    const getCoaches = async () => {
        try {
            const { data } = await axios.get(`${coachUrl}?role=coach`);
            console.log(data);
            setCoaches(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <coachContext.Provider
            value={{
                coaches,
                getCoaches,
            }}>
            {children}
        </coachContext.Provider>
    );
};
