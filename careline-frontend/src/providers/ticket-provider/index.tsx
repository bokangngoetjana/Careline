"use client"
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, ICreateTicket, TicketActionContext, TicketStateContext } from "./context";
import { TicketReducer } from "./reducer";
import {
    createTicketPending,
    createTicketSuccess,
    createTicketError,
    getTicketsPending,
    getTicketsSuccess,
    getTicketsError
} from "./actions";

export const TicketProvider = ({children} : {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(TicketReducer, INITIAL_STATE);
    const instance = axiosInstance;

    const createTicket = async (ticket: ICreateTicket) => {
            dispatch(createTicketPending());
        try{
            const token = sessionStorage.getItem("token");
            if(!token)
                throw new Error("User not authenticated");

           const endpoint = `/services/app/Ticket/Create`;
           const { data } = await instance.post(endpoint, ticket, {
            headers: { Authorization: `Bearer ${token}`}
           });
            dispatch(createTicketSuccess(data.result || ticket));
        }catch(error){
            console.error("Failed to create ticket", error);
            dispatch(createTicketError());
        }
    };
      const getMyTickets = async () => {
    dispatch(getTicketsPending());
    try {
      const token = sessionStorage.getItem("token");
      const patientId = sessionStorage.getItem("patientId");

      if (!token || !patientId) throw new Error("User not authenticated");

      const endpoint = `/services/app/Ticket/GetAll?PatientId=${patientId}`;
      const { data } = await instance.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });

      dispatch(getTicketsSuccess(data.result || []));
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      dispatch(getTicketsError());
    }
  };
return(
  <TicketStateContext.Provider value={state}>
      <TicketActionContext.Provider value={{ createTicket, getMyTickets }}>
        {children}
      </TicketActionContext.Provider>
    </TicketStateContext.Provider>   
);
};

export const useTicketState = () => {
    const context = useContext(TicketStateContext);
    if(!context){
        console.log("useTicketState must be used within a ticket provider")
    }
    return context;
};
export const useTicketActions = () => {
  const context = useContext(TicketActionContext);
  if (!context) {
    throw new Error("useTicketActions must be used within a TicketProvider");
  }
  return context;
};