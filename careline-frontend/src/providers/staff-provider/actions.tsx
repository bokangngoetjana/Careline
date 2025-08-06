"use client";
import { createAction } from "redux-actions";
import { IStaff, IStaffStateContext } from "./context";

export enum StaffActionEnum {
  getProfilePending = "GET_STAFF_PROFILE_PENDING",
  getProfileSuccess = "GET_STAFF_PROFILE_SUCCESS",
  getProfileError = "GET_STAFF_PROFILE_ERROR",

  getStaffPending = "GET_STAFF_PENDING",
  getStaffSuccess = "GET_STAFF_SUCCESS",
  getStaffError = "GET_STAFF_ERROR",

  createStaffPending = "CREATE_STAFF_PENDING",
  createStaffSuccess = "CREATE_STAFF_SUCCESS",
  createStaffError = "CREATE_STAFF_ERROR",

  updateStaffPending = "UPDATE_STAFF_PENDING",
  updateStaffSuccess = "UPDATE_STAFF_SUCCESS",
  updateStaffError = "UPDATE_STAFF_ERROR",

  deleteStaffPending = "DELETE_STAFF_PENDING",
  deleteStaffSuccess = "DELETE_STAFF_SUCCESS",
  deleteStaffError = "DELETE_STAFF_ERROR",
}
// PROFILE
export const getProfilePending = createAction<IStaffStateContext>(
  StaffActionEnum.getProfilePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    error: null,
  })
);

export const getProfileSuccess = createAction<IStaffStateContext, IStaff | null>(
  StaffActionEnum.getProfileSuccess,
  (profile: IStaff | null) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    profile,
    error: null,
  })
);

export const getProfileError = createAction<IStaffStateContext, string>(
  StaffActionEnum.getProfileError,
  (error: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
  })
);
// GET ALL
export const getStaffPending = createAction<IStaffStateContext>(
  StaffActionEnum.getStaffPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);
export const getStaffSuccess = createAction<IStaffStateContext, IStaff[]>(
  StaffActionEnum.getStaffSuccess,
  (staffList: IStaff[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    staffList,
  })
);
export const getStaffError = createAction<IStaffStateContext>(
  StaffActionEnum.getStaffError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// CREATE
export const createStaffPending = createAction<IStaffStateContext>(
  StaffActionEnum.createStaffPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createStaffSuccess = createAction<IStaffStateContext, IStaff>(
  StaffActionEnum.createStaffSuccess,
  (staff: IStaff) => ({ isPending: false, isSuccess: true, isError: false, staffList: staff ? [staff] : [] })
);

export const createStaffError = createAction<IStaffStateContext>(
  StaffActionEnum.createStaffError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// UPDATE
export const updateStaffPending = createAction<IStaffStateContext>(
  StaffActionEnum.updateStaffPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateStaffSuccess = createAction<IStaffStateContext>(
  StaffActionEnum.updateStaffSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);

export const updateStaffError = createAction<IStaffStateContext>(
  StaffActionEnum.updateStaffError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// DELETE
export const deleteStaffPending = createAction<IStaffStateContext>(
  StaffActionEnum.deleteStaffPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteStaffSuccess = createAction<IStaffStateContext>(
  StaffActionEnum.deleteStaffSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);

export const deleteStaffError = createAction<IStaffStateContext>(
  StaffActionEnum.deleteStaffError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);