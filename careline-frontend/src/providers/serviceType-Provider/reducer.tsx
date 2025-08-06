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
    [ServiceTypeEnum.createServiceTypePending]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.createServiceTypeSuccess]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.createServiceTypeError]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ServiceTypeEnum.updateServiceTypePending]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.updateServiceTypeSuccess]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.updateServiceTypeError]: (state, action) => ({
        ...state,
        ...action.payload
    }),
    [ServiceTypeEnum.deleteServiceTypePending]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.deleteServiceTypeSuccess]: (state, action) => ({
        ...state,
        ...action.payload
    }),
     [ServiceTypeEnum.deleteServiceTypeError]: (state, action) => ({
        ...state,
        ...action.payload
    }),
}, INITIAL_STATE)