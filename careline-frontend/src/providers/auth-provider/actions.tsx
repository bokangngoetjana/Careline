import {createAction} from 'redux-actions';
import { IUser, IAuthStateContext } from './context';

export enum AuthActionEnums{
    //Register Patient
    registerPatientPending = "REGISTER_PATIENT_PENDING",
    registerPatientSuccess = "REGISTER_PATIENT_SUCCESS",
    registerPatientError = "REGISTER_PATIENT_ERROR",

    // Register Staff
    registerStaffPending = "REGISTER_STAFF_PENDING",
    registerStaffSuccess = "REGISTER_STAFF_SUCCESS",
    registerStaffError = "REGISTER_STAFF_ERROR",

     // Login
    loginUserPending = "LOGIN_USER_PENDING",
    loginUserSuccess = "LOGIN_USER_SUCCESS",
    loginUserError = "LOGIN_USER_ERROR"
}
export const registerPatientPending = createAction<IAuthStateContext>(
  AuthActionEnums.registerPatientPending, () => (
    { 
        isPending: true,
        isSuccess: false,
        isError: false 
    })
);
export const registerPatientSuccess = createAction<IAuthStateContext, IUser>(
    AuthActionEnums.registerPatientSuccess, (user: IUser) => (
        {
            isPending: false,
            isSuccess: true,
            isError: false,
            user
        }
    )
)
export const registerPatientError = createAction<IAuthStateContext>(
  AuthActionEnums.registerPatientError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Staff Auth
export const registerStaffPending = createAction<IAuthStateContext>(
  AuthActionEnums.registerStaffPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const registerStaffSuccess = createAction<IAuthStateContext, IUser>(
  AuthActionEnums.registerStaffSuccess,
  (user: IUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user
  })
);

export const registerStaffError = createAction<IAuthStateContext>(
  AuthActionEnums.registerStaffError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//login
export const loginUserPending = createAction<IAuthStateContext>(
  AuthActionEnums.loginUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const loginUserSuccess = createAction<IAuthStateContext, IUser>(
  AuthActionEnums.loginUserSuccess,
  (user: IUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    user
  })
);

export const loginUserError = createAction<IAuthStateContext>(
  AuthActionEnums.loginUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);