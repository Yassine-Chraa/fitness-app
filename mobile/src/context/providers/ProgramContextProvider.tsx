import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Program from '../../types/Program';
import UserProgram from '../../types/UserProgram';

export type specialType = {
  title: string,
  category: 'bulking' | 'maintaining' | 'cutting',
  difficulty_level: 'beginner' | 'intermediate' | 'advanced',
}
export type programContextType = {
  currentProgram: UserProgram;
  userPrograms: Array<UserProgram>;
  programs: Array<Program>;
  getPrograms: () => Promise<void>;
  getUserPrograms: (userId: number) => Promise<void>;
  getCurrentProgram: (userId: number) => Promise<void>;
  createProgram: (program: specialType, user_id: number) => Promise<string | undefined>;
  updateProgram: (programId: number, program: specialType) => Promise<string | undefined>;
  deleteProgram: (programId: number) => Promise<string | undefined>;
  useProgramAsCurrent: (programId: number) => Promise<boolean | undefined>;
  enrollProgram: (userId: number, programId: number) => Promise<string>;
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
  const [currentProgram, setCurrentProgam] = useState(Object)
  const getPrograms = async () => {
    try {
      const { data } = await axios.get(programsUrl);
      setPrograms(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserPrograms = async (userId: number) => {
    try {
      const { data } = await axios.get(`${userProgramsUrl}?user_id=${userId}`);
      setUserPrograms(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentProgram = async (userId: number) => {
    try {
      const { data } = await axios.get(`${userProgramsUrl}?user_id=${userId}&isUsed=1`);
      setCurrentProgam(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createProgram = async (program: specialType, user_id: number) => {
    try {
      const { data } = await axios.post(userProgramsUrl, { ...program, isPublic: 0, user_id });
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const updateProgram = async (programId: number, program: specialType) => {
    try {
      const { data } = await axios.put(`${userProgramsUrl}/${programId}`, program);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProgram = async (programId: number) => {
    try {
      const { data } = await axios.delete(`${userProgramsUrl}/${programId}`);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  };
  const useProgramAsCurrent = async (programId: number) => {
    try {
      userPrograms.forEach(async (userProgram: UserProgram) => {
        if (userProgram.id == programId) {
          await axios.put(`${userProgramsUrl}/${userProgram.id}`, { isUsed: 1 });
        } else {
          await axios.put(`${userProgramsUrl}/${userProgram.id}`, { isUsed: 0 });
        }
      })
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  const enrollProgram = async (userId: number, programId: number) => {
    try {
      const { data } = await axios.post(`${userProgramsUrl}/enroll`, { user_id: userId, program_id: programId });
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <programContext.Provider
      value={{
        currentProgram,
        userPrograms,
        programs,
        getPrograms,
        getUserPrograms,
        getCurrentProgram,
        createProgram,
        updateProgram,
        deleteProgram,
        useProgramAsCurrent,
        enrollProgram
      }}>
      {children}
    </programContext.Provider>
  );
};
