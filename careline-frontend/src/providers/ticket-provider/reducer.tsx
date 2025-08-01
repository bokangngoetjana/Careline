import { handleActions } from "redux-actions";
import {INITIAL_STATE, ITicketStateContext } from "./context";
import { TicketActionEnum } from "./actions";

export const TicketReducer = handleActions<ITicketStateContext, ITicketStateContext>({
    [TicketActionEnum.createTicketPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [TicketActionEnum.createTicketSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [TicketActionEnum.createTicketError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [TicketActionEnum.getTicketsPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [TicketActionEnum.getTicketsSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [TicketActionEnum.getTicketsError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, INITIAL_STATE)