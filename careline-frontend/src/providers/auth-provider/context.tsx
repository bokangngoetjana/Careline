import { createContext } from "react";

export interface IUser {
  name?: string;
  surname?: string;
  userName?: string;
  email?: string;
  password?: string;
  identityNo?: number;
  employeeNo?: string;
  gender?: number;
  serviceTypeId?: string;
  symptoms?: string;
  userNameOrEmailAddress?: string;
}
export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  user?: IUser;
}
export interface IAuthActionContext{
    registerPatient: (user: IUser) => Promise<void>;
    registerStaff: (user: IUser) => Promise<void>;
    loginUser: (user: IUser) => Promise<void>;
}
export const INITIAL_STATE: IAuthStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
}
export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);
export const AuthActionContext = createContext<IAuthActionContext>(undefined!);