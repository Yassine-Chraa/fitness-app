import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Progam from '../../types/Program';

export type programContextType = {
  programs: Array<Progam>;
  getUserPrograms: (userId:number) => Promise<void>;
};
const programContext = createContext<programContextType | null>(null);

export const useProgram = () => {
  const context = useContext(programContext);
  if (!context) throw new Error('program Provider is missing');
  return context;
};

const programsUrl = getUrl('Programs');

export const ProgramContextProvider = ({ children }: any) => {
  const [programs, setPrograms] = useState([])
  const getUserPrograms = async (userId:number) => {
    try {
      const { data } = await axios.get(`${programsUrl}/${userId}`);
      setPrograms(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <programContext.Provider
      value={{
        programs,
        getUserPrograms,
      }}>
      {children}
    </programContext.Provider>
  );
};
