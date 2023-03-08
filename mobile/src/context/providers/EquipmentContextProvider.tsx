import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl, currentUser } from '../../Helpers/APIConfig';
import Equipment from '../../types/Equipment';

export type EquipmentContextType = {
  getEquipments: () => Promise<Array<Equipment>>;
  getEquipment: (id: number) => Promise<Equipment>;
  addEquipment: (Equipment: Equipment) => Promise<{ message: string }>;
  updateEquipment: (id: number, Equipment: Equipment) => Promise<{ message: string }>;
  deleteEquipment: (id: number) => Promise<{ message: string }>;
};
const EquipmentContext = createContext<EquipmentContextType | null>(null);

export const useEquipment = () => {
  const context = useContext(EquipmentContext);
  if (!context) throw new Error('Equipment Provider is missing');
  return context;
};

const EquipmentUrl = getUrl('Equipments');

export const EquipmentContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const getEquipments = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };

      const { data } = await axios.get(`${EquipmentUrl}`, config);
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getEquipment = async (id: number) => {
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
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const addEquipment = async (Equipment: Equipment) => {
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
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const updateEquipment = async (id: number, Equipment: Equipment) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const { data } = await axios.put(`${EquipmentUrl}`, Equipment, config);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const deleteEquipment = async (id: number) => {
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
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <EquipmentContext.Provider
      value={{
        getEquipments,
        getEquipment,
        addEquipment,
        updateEquipment,
        deleteEquipment,
      }}>
      {children}
    </EquipmentContext.Provider>
  );
};
