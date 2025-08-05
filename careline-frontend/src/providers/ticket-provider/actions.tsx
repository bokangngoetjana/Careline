import { createAction } from "redux-actions";
import { ITicket, ITicketStateContext } from "./context";

export enum TicketActionEnum {
  // Create Ticket
  createTicketPending = "CREATE_TICKET_PENDING",
  createTicketSuccess = "CREATE_TICKET_SUCCESS",
  createTicketError = "CREATE_TICKET_ERROR",

  getTicketsPending = "GET_TICKETS_PENDING",
  getTicketsSuccess = "GET_TICKETS_SUCCESS",
  getTicketsError = "GET_TICKETS_ERROR",

  assignStaffPending = "ASSIGN_STAFF_PENDING",
  assignStaffSuccess = "ASSIGN_STAFF_SUCCESS",
  assignStaffError = "ASSIGN_STAFF_ERROR",

  updateTicketStatusPending = "UPDATE_TICKET_STATUS_PENDING",
  updateTicketStatusSuccess = "UPDATE_TICKET_STATUS_SUCCESS",
  updateTicketStatusError = "UPDATE_TICKET_STATUS_ERROR", 

  deleteTicketPending = "DELETE_TICKET_PENDING",
  deleteTicketSuccess = "DELETE_TICKET_SUCCESS",
  deleteTicketError = "DELETE_TICKET_ERROR",
}
export const createTicketPending = createAction<ITicketStateContext>(
    TicketActionEnum.createTicketPending, () => ({
        isPending: true,
        isSuccess: false,
        isError: false
    })
);
export const createTicketSuccess = createAction<ITicketStateContext, ITicket>(
    TicketActionEnum.createTicketSuccess, (ticket: ITicket) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        ticket
    })
);
export const createTicketError = createAction<ITicketStateContext>(
  TicketActionEnum.createTicketError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
export const updateTicketStatusPending = createAction<ITicketStateContext>(
  TicketActionEnum.updateTicketStatusPending, () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);
export const updateTicketStatusSuccess = createAction<ITicketStateContext, { ticketId: string, status: number }>(
  TicketActionEnum.updateTicketStatusSuccess, ({ ticketId, status }) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    ticketId,
    status
  })
);
export const updateTicketStatusError = createAction<ITicketStateContext>(
  TicketActionEnum.updateTicketStatusError, () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
//get tickects
export const getTicketsPending = createAction<ITicketStateContext>(
  TicketActionEnum.getTicketsPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const getTicketsSuccess = createAction<ITicketStateContext, ITicket[]>(
  TicketActionEnum.getTicketsSuccess,
  (tickets: ITicket[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    tickets
  })
);
export const getTicketsError = createAction<ITicketStateContext>(
  TicketActionEnum.getTicketsError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);

//assign staff
export const assignStaffPending = createAction<ITicketStateContext>(
  TicketActionEnum.assignStaffPending, () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);
export const assignStaffSuccess = createAction<ITicketStateContext, {ticketId: string, staffId: string}>(
  TicketActionEnum.assignStaffSuccess, ({ticketId, staffId}) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    ticketId,
    staffId,
  })
);
export const assignStaffError = createAction<ITicketStateContext>(
  TicketActionEnum.assignStaffError, () => ({
    isPending: false,
    isSuccess: false,
    isError: true 
  })
);
// Delete ticket
export const deleteTicketPending = createAction<ITicketStateContext>(
  TicketActionEnum.deleteTicketPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const deleteTicketSuccess = createAction<ITicketStateContext, string>(
  TicketActionEnum.deleteTicketSuccess,
  (ticketId: string) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    ticketId
  })
);

export const deleteTicketError = createAction<ITicketStateContext>(
  TicketActionEnum.deleteTicketError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
