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
const uploadUrl = getUrl("Upload");

export const ProgramContextProvider = ({ children }) => {

    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getPrograms = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ProgramUrl}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getProgram = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ProgramUrl}/${id}`);
            console.log(data);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const addProgram = async (Program,imageFile) => {
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
                res = await axios.post(`${ProgramUrl}`, {...Program,main_img: data.img_url});
            } else {
                res = await axios.post(`${ProgramUrl}`, Program);
            }
            setLoadingAnimation(dispatch, false);
            return true;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const updateProgram = async (Program) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.put(`${ProgramUrl}/${Program.id}`, Program);
            console.log(data)
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log("Error : " + error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteProgram = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.delete(`${ProgramUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const getTotalPrograms = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ProgramUrl}/total`);
            setLoadingAnimation(dispatch, false);
            return data.total;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
            return false;
        }
    };

    return (
        <programContext.Provider
            value={{
                getPrograms,
                getTotalPrograms,
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
