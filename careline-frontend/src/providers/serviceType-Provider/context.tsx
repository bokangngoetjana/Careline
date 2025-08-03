"use client";
import { createContext } from "react";

export interface IServiceType {
  id?: string;
  name: string;
  description?: string;
}
export interface IServiceTypeStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  serviceTypes?: IServiceType[];
}
export interface IServiceTypeActionContext {
  getServiceType: () => Promise<void>;
}
export const INITIAL_STATE: IServiceTypeStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  serviceTypes: [],
};
export const ServiceTypeStateContext = createContext<IServiceTypeStateContext>(INITIAL_STATE);
export const ServiceTypeActionContext = createContext<IServiceTypeActionContext>(undefined!);