import { createContext, useContext, useState } from "react";
import { getUrl } from "../API/Helper";

const equipmentContext = createContext();

export const useEquipment = () => {
    const context = useContext(equipmentContext);
    if (!context) throw new Error("Equipment Provider is missing");
    return context;
};

const EquipmentUrl = getUrl("Equipments");

//-------------
const currentUser = {
    id: 1,
    role: "admin",
    name: "Yassine Chraa",
    email: "yassinechraa@gmail.com",
    email_verified_at: null,
    profile: null,
    created_at: "",
    updated_at: "",
    token: "1|3pkkXlSGZA8Kh7qbuVruzoFbPKbeiJvKepE8Ey3U",
};
//-------------

export const EquipmentContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getEquipments = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.get(`${EquipmentUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getEquipment = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${EquipmentUrl}`,id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addEquipment = async (Equipment) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${EquipmentUrl}`, Equipment, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateEquipment = async (id, Equipment) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${EquipmentUrl}`, id, Equipment, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteEquipment = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${EquipmentUrl}`,id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <equipmentContext.Provider
            value={{
                getEquipments,
                getEquipment,
                addEquipment,
                updateEquipment,
                deleteEquipment,
            }}
        >
            {children}
        </equipmentContext.Provider>
    );
};
