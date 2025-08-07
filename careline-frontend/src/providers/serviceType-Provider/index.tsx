"use client";
import { useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, IServiceType, ServiceTypeActionContext, ServiceTypeStateContext } from "./context";
import { ServiceTypeReducer } from "./reducer";
import {
    getServiceTypePending,
    getServiceTypeSuccess, 
    getServiceTypeError,
    createServiceTypePending,
    createServiceTypeSuccess,
    createServiceTypeError,
    updateServiceTypePending,
    updateServiceTypeSuccess,
    updateServiceTypeError,
    deleteServiceTypePending,
    deleteServiceTypeSuccess,
    deleteServiceTypeError
} from "./actions";

export const ServiceTypeProvider = ({children} : {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(ServiceTypeReducer, INITIAL_STATE);
    const instance = axiosInstance;

    //GET ALL
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
        } catch (error: unknown){
            dispatch(getServiceTypeError());
            console.log(error);
        }
    };

    // CREATE
    const createServiceType = async (serviceType: IServiceType) => {
    dispatch(createServiceTypePending());
    const endpoint = "/services/app/ServiceType/Create";
    try{
        const {data} = await instance.post(endpoint, serviceType);
        dispatch(createServiceTypeSuccess(data.result));
    } catch (error){
        console.error("Failed to create service type", error);
        dispatch(createServiceTypeError());
    }
  };
  // update
  const updateServiceType = async (serviceType: IServiceType): Promise<void> => {
    dispatch(updateServiceTypePending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.put("/services/app/ServiceType/Update", serviceType, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(updateServiceTypeSuccess());
      await getServiceType(); // Refresh list
    } catch (error) {
      console.error("Failed to update service type", error);
      dispatch(updateServiceTypeError());
    }
  };

  // DELETE
  const deleteServiceType = async (id: string): Promise<void> => {
    dispatch(deleteServiceTypePending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await instance.delete(`/services/app/ServiceType/Delete?Id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteServiceTypeSuccess());
      await getServiceType(); // Refresh list
    } catch (error) {
      console.error("Failed to delete service type", error);
      dispatch(deleteServiceTypeError());
    }
  };
    return(
        <ServiceTypeStateContext.Provider value={state}>
            <ServiceTypeActionContext.Provider value={{ getServiceType, createServiceType, updateServiceType, deleteServiceType}}>
                {children}
            </ServiceTypeActionContext.Provider>
        </ServiceTypeStateContext.Provider>
    );
};