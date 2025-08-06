"use client";
import { createAction } from "redux-actions";
import { IServiceType, IServiceTypeStateContext } from "./context";

export enum ServiceTypeEnum {
    getServiceTypePending = "GET_SERVICE_TYPE_PENDING",
    getServiceTypeSuccess = "GET_SERVICE_TYPE_SUCCESS",
    getServiceTypeError = "GET_SERVICE_TYPE_ERROR",

    createServiceTypePending = "CREATE_SERVICE_TYPE_PENDING",
    createServiceTypeSuccess = "CREATE_SERVICE_TYPE_SUCCESS",
    createServiceTypeError = "CREATE_SERVICE_TYPE_ERROR",

    updateServiceTypePending = "UPDATE_SERVICE_TYPE_PENDING",
    updateServiceTypeSuccess = "UPDATE_SERVICE_TYPE_SUCCESS",
    updateServiceTypeError = "UPDATE_SERVICE_TYPE_ERROR",

    deleteServiceTypePending = "DELETE_SERVICE_TYPE_PENDING",
    deleteServiceTypeSuccess = "DELETE_SERVICE_TYPE_SUCCESS",
    deleteServiceTypeError = "DELETE_SERVICE_TYPE_ERROR",
}
//GET SERVICE TYPES
export const getServiceTypePending = createAction<IServiceTypeStateContext>(
    ServiceTypeEnum.getServiceTypePending, () => ({
        isPending: true,
        isSuccess: false,
        isError: false
    })
);
export const getServiceTypeSuccess = createAction<IServiceTypeStateContext, IServiceType[]>(
    ServiceTypeEnum.getServiceTypeSuccess, (serviceTypes: IServiceType[]) => ({
        isPending: false,
        isSuccess: true,
        isError: false,
        serviceTypes
    })
);
export const getServiceTypeError = createAction<IServiceTypeStateContext>(
    ServiceTypeEnum.getServiceTypeError, () => ({
        isPending: false,
        isSuccess: false,
        isError: true
    })
)
// CREATE SERVICE TYPES
export const createServiceTypePending = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.createServiceTypePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const createServiceTypeSuccess = createAction<IServiceTypeStateContext, IServiceType>(
  ServiceTypeEnum.createServiceTypeSuccess,
  (serviceType: IServiceType) => ({ isPending: false, isSuccess: true, isError: false, serviceTypes: serviceType ? [serviceType] : []})
);
export const createServiceTypeError = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.createServiceTypeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
// UPDATE
export const updateServiceTypePending = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.updateServiceTypePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const updateServiceTypeSuccess = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.updateServiceTypeSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);
export const updateServiceTypeError = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.updateServiceTypeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
//DELETE
export const deleteServiceTypePending = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.deleteServiceTypePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const deleteServiceTypeSuccess = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.deleteServiceTypeSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);
export const deleteServiceTypeError = createAction<IServiceTypeStateContext>(
  ServiceTypeEnum.deleteServiceTypeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);