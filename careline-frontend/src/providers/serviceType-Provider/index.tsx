"use client";
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, IServiceType, ServiceTypeActionContext, ServiceTypeStateContext } from "./context";
import { ServiceTypeReducer } from "./reducer";
import {
    getServiceTypePending,
    getServiceTypeSuccess, 
    getServiceTypeError
} from "./actions";

export const ServiceTypeProvider = ({children} : {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(ServiceTypeReducer, INITIAL_STATE);
    const instance = axiosInstance;

    const getServiceType = async () => {
        try{
            dispatch(getServiceTypePending());

            const token = sessionStorage.getItem("token");
            if(!token)
                throw new Error("User not authenticated");

            const { data } = await instance.get("/services/app/ServiceType/GetAll", {
                headers: {Authorization: `Bearer ${token}`},
            });
            dispatch(getServiceTypeSuccess(data.result.items));
        } catch (error: any){
            dispatch(getServiceTypeError());
            console.log(error);
        }
    };

    return(
        <ServiceTypeStateContext.Provider value={state}>
            <ServiceTypeActionContext.Provider value={{ getServiceType}}>
                {children}
            </ServiceTypeActionContext.Provider>
        </ServiceTypeStateContext.Provider>
    );
};