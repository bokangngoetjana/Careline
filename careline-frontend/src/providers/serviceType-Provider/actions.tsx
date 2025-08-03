"use client";
import { createAction } from "redux-actions";
import { IServiceType, IServiceTypeStateContext } from "./context";

export enum ServiceTypeEnum {
    getServiceTypePending = "GET_SERVICE_TYPE_PENDING",
    getServiceTypeSuccess = "GET_SERVICE_TYPE_SUCCESS",
    getServiceTypeError = "GET_SERVICE_TYPE_ERROR",
}
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