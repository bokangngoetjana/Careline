import { createContext } from "react";

export interface ITicket {
  id?: string;
  patientId?: string;
  staffId?: string;
  queueId?: string;
  serviceTypeId?: string;
  symptoms?: string;
  queueNumber?: number;
  status?: number;
  checkInTime?: string;
  patientName?: string;
  staffName?: string;
  queueName?: string;
  serviceTypeName?: string;
}
export interface ICreateTicket{
    patientId: string;
    queueId: string;
    serviceTypeId: string;
    symptoms: string;
}
export interface IAssignStaff{
    ticketId: string;
    staffId: string;
}

export interface ITicketStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    tickets?: ITicket[];
}
export interface ITicketActionContext {
    createTicket: (ticket: ICreateTicket) => Promise<void>;
    getMyTickets: () => Promise<void>;
    getAllTickets: () => Promise<void>;
    getTicketsByQueueId: (queueId: string) => Promise<void>
    getTicketsByPatientId: (patientId: string) => Promise<void>;
    assignStaffToTicket: (ticketId: string, staffId: string) => Promise<void>;
    updateTicketStatus: (ticketId: string, status: number, staffId?:string) => Promise<void>;
    deleteTicket: (ticketId: string) => Promise<void>
}
export const INITIAL_STATE: ITicketStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    tickets: [],
};

export const TicketStateContext = createContext<ITicketStateContext>(INITIAL_STATE);
export const TicketActionContext = createContext<ITicketActionContext>(undefined!);