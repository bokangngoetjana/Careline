"use client"
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, ITicket, TicketActionContext, TicketStateContext } from "./context";
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
  
};