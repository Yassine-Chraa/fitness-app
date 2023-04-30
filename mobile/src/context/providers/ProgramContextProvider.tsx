import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Program from '../../types/Program';
import UserProgram from '../../types/UserProgram';

export type programContextType = {
  currentProgram: UserProgram;
  userPrograms: Array<UserProgram>;
  programs: Array<Program>;
  getPrograms: ()=>Promise<void>;
  getUserPrograms: (userId:number) => Promise<void>;
  getCurrentProgram: (userId:number) => Promise<void>;
  addProgram: (program:Program) =>Promise<string | undefined>;
  updateProgram: (programId:number,program:Program) =>Promise<string | undefined>;
  deleteProgram: (programId:number) =>Promise<string | undefined>;
};
const programContext = createContext<programContextType | null>(null);

export const useProgram = () => {
  const context = useContext(programContext);
  if (!context) throw new Error('program Provider is missing');
  return context;
};

const programsUrl = getUrl('Programs');
const userProgramsUrl = getUrl('UserPrograms');

export const ProgramContextProvider = ({ children }: any) => {
  const [programs, setPrograms] = useState([])
  const [userPrograms, setUserPrograms] = useState([])
  const [currentProgram,setCurrentProgam] = useState(Object)
  const getPrograms = async () => {
    try {
      const { data } = await axios.get(programsUrl);
      setPrograms(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserPrograms = async (userId:number) => {
    try {
      const { data } = await axios.get(`${userProgramsUrl}?user_id=${userId}`);
      setUserPrograms(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentProgram = async (userId:number) => {
    try {
      const { data } = await axios.get(`${userProgramsUrl}?user_id=${userId}&isUsed=1`);
      setCurrentProgam(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const addProgram = async (program:Program) => {
    try {
      const { data } = await axios.post(userProgramsUrl,program);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const updateProgram = async (programId:number,program:Program) => {
    try {
      const { data } = await axios.put(`${userProgramsUrl}/${programId}`,program);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProgram = async (programId:number) => {
    try {
      const { data } = await axios.delete(`${userProgramsUrl}/${programId}`);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };

  //create Table userPrograms (id,program_id,user_id,isUsed)
  //setProgramAsCurrent
  //enrollProgram

  //Add User Programs Screen + create/Update Program Model + create/update Workout Screen (or model)

  return (
    <programContext.Provider
      value={{
        currentProgram,
        userPrograms,
        programs,
        getPrograms,
        getUserPrograms,
        getCurrentProgram,
        addProgram,
        updateProgram,
        deleteProgram,
      }}>
      {children}
    </programContext.Provider>
  );
};
