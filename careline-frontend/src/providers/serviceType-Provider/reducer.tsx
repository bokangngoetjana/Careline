import { handleActions } from "redux-actions";
import { INITIAL_STATE, IServiceTypeStateContext } from "./context";
import { ServiceTypeEnum } from "./actions";

export const ServiceTypeReducer = handleActions<IServiceTypeStateContext, IServiceTypeStateContext>({
    [ServiceTypeEnum.getServiceTypePending]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.getServiceTypeSuccess]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.getServiceTypeError]: (state, action) => ({
        ...state,
        ...action.payload
    }),
}, INITIAL_STATE)