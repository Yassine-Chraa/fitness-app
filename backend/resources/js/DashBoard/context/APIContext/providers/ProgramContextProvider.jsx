import { createContext, useContext } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const programContext = createContext();

export const useProgram = () => {
    const context = useContext(programContext);
    if (!context) throw new Error("Program Provider is missing");
    return context;
};

const ProgramUrl = getUrl('Programs');

export const ProgramContextProvider = ({ children }) => {

    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getPrograms = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };

            const { data } = await axios.get(`${ProgramUrl}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            alert(ProgramUrl)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getProgram = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${ProgramUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const addProgram = async (Program) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            alert(ProgramUrl)
            const { data } = await axios.post(`${ProgramUrl}`, Program, config);
            console.log(JSON.stringify(data))
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const updateProgram = async (Program) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            console.log(Program)
            const { data } = await axios.put(`${ProgramUrl}/${Program.id}`, Program, config);
            console.log(data)
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log("Error : "+error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteProgram = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.delete(`${ProgramUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <programContext.Provider
            value={{
                getPrograms,
                getProgram,
                addProgram,
                updateProgram,
                deleteProgram,
            }}
        >
            {children}
        </programContext.Provider>
    );
};
