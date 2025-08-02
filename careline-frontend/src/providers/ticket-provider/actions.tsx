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