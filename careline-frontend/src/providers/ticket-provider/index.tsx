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
    getTicketsError,
    assignStaffPending,
    assignStaffSuccess,
    assignStaffError,
    updateTicketStatusPending,
    updateTicketStatusSuccess,
    updateTicketStatusError,
    deleteTicketPending,
    deleteTicketSuccess,
    deleteTicketError
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
    const updateTicketStatus = async (ticketId: string, status: number, staffId?: string) => {
        dispatch(updateTicketStatusPending());
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");

            const endpoint = `/services/app/Ticket/UpdateTicketStatus`;
            const payload = {
            id: ticketId,
            status,
            staffId: staffId || sessionStorage.getItem("nurseId")
            };

            await instance.put(endpoint, payload, {
            headers: { Authorization: `Bearer ${token}` },
            });

            dispatch(updateTicketStatusSuccess({ ticketId, status }));
        } catch (error) {
            console.error("Failed to update ticket status", error);
            dispatch(updateTicketStatusError());
        }
    };
     const getAllTickets = async () => {
    dispatch(getTicketsPending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.get("/services/app/Ticket/GetAll", {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch(getTicketsSuccess(data.result?.items || []));
    } catch {
      dispatch(getTicketsError());
    }
  };
    const getTicketsByQueueId = async (queueId: string) => {
        dispatch(getTicketsPending());

        try{
            const token = sessionStorage.getItem("token");
            if(!token)
                throw new Error("User not authenticated");

            const endpoint = `/services/app/Ticket/GetTicketsByQueueId?queueId=${queueId}`;
            const { data } = await instance.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(getTicketsSuccess(data.result || []));
        } catch(error){
            console.error("Failed to fetch tickets by queue Id", error);
            dispatch(getTicketsError());
        }
    };
    
    const getTicketsByPatientId = async (patientId: string) => {
        dispatch(getTicketsPending());
        try{
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");

             const endpoint = `/services/app/Ticket/GetTicketsByPatientId?patientId=${patientId}`;
            const { data } = await instance.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(getTicketsSuccess(data.result || []));
        } catch (error) {
            console.error("Failed to fetch tickets by patientId", error);
            dispatch(getTicketsError());
        }
    };

    const assignStaffToTicket = async (ticketId: string, staffId: string) => {
        dispatch(assignStaffPending());
        try{
            const staffId = sessionStorage.getItem("nurseId");
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");
            if (!staffId) throw new Error("No staffId found in sessionStorage");

            const endpoint = `/services/app/Ticket/AssignStaffToTicket`;
            const payload = { ticketId, staffId};

            await instance.post(endpoint, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(assignStaffSuccess({ticketId, staffId}));
        } catch (error){
            console.error("Failed to assign staff to ticket", error);
            dispatch(assignStaffError());
        }
    }

    const deleteTicket = async (ticketId: string) => {
        dispatch(deleteTicketPending());
        try {
            const token = sessionStorage.getItem("token");
            if (!token) throw new Error("User not authenticated");

            const endpoint = `/services/app/Ticket/Delete?Id=${ticketId}`;
            await instance.delete(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
            });

            dispatch(deleteTicketSuccess(ticketId));
            await getMyTickets(); // Refresh list after deleting
        } catch (error) {
            console.error("Failed to delete ticket", error);
            dispatch(deleteTicketError());
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

      dispatch(getTicketsSuccess(data.result?.items || []));
    } catch (error) {
      console.error("Failed to fetch tickets", error);
      dispatch(getTicketsError());
    }
  };
  
return(
  <TicketStateContext.Provider value={state}>
      <TicketActionContext.Provider value={{ createTicket, getMyTickets, getTicketsByPatientId, getTicketsByQueueId, assignStaffToTicket, updateTicketStatus, deleteTicket, getAllTickets }}>
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