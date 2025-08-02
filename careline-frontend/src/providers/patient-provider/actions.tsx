import { createAction } from "redux-actions";
import { IPatient, IPatientStateContext } from "./context";

export enum PatientActionEnum {
    getProfilePending = "GET_PATIENT_PROFILE_PENDING",
    getProfileSuccess = "GET_PATIENT_PROFILE_SUCCESS",
    getProfileError = "GET_PATIENT_PROFILE_ERROR",

    updateProfilePending = "UPDATE_PATIENT_PROFILE_PENDING",
    updateProfileSuccess = "UPDATE_PATIENT_PROFILE_SUCCESS",
    updateProfileError = "UPDATE_PATIENT_PROFILE_ERROR",
}
export const getProfilePending = createAction<IPatientStateContext>(
  PatientActionEnum.getProfilePending,
  () => ({ 
    isPending: true, 
    isSuccess: false, 
    isError: false, 
    error: null })
);
export const getProfileSuccess = createAction<IPatientStateContext, IPatient | null>(
    PatientActionEnum.getProfileSuccess, (profile: IPatient | null) => (
    {
        isPending: false,
        isSuccess: true,
        isError: false,
        profile,
        error: null
    }
)
);
export const getProfileError = createAction<IPatientStateContext, string>(
  PatientActionEnum.getProfileError,
  (error: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    profile: undefined,
    error
  })
);
export const updateProfilePending = createAction<IPatientStateContext>(
  PatientActionEnum.updateProfilePending,
  () => ({ isPending: true, isSuccess: false, isError: false, error: null })
);

export const updateProfileSuccess = createAction<
  IPatientStateContext,
  IPatient
>(
  PatientActionEnum.updateProfileSuccess,
  (profile: IPatient) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    profile,
    error: null
  })
);
export const updateProfileError = createAction<IPatientStateContext, string>(
  PatientActionEnum.updateProfileError,
  (error: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error
  })
);