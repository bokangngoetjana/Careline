"use client";
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { INITIAL_STATE, IUser, AuthStateContext, AuthActionContext } from "./context";
import { AuthReducer } from "./reducer";
import { AbpTokenProperies, decodeToken } from "@/utils/jwt";
import { useRouter } from "next/navigation";
import {
    registerPatientPending, 
    registerPatientSuccess, 
    registerPatientError,
    registerStaffPending,
    registerStaffSuccess,
    registerStaffError,
    loginUserPending,
    loginUserSuccess,
    loginUserError 
} from "./actions"

export const AuthProvider = ({children} : { children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const instance = axiosInstance;
    const router = useRouter();

    const registerPatient = async (user: IUser) => {
        dispatch(registerPatientPending());
        const endpoint: string = '/services/app/Patient/Create';

        await instance.post(endpoint, user)
        .then((response) => {
            dispatch(registerPatientSuccess(response.data))
            router.push('/login');
        }).catch((error) => {
            dispatch(registerPatientError())
            console.log(error);
        })
    };

    const registerStaff = async (user: IUser) => {
        if(!user.roleName){
            alert("Please select a role for the staff member.");
            return;
        }
        dispatch(registerStaffPending());
        const endpoint: string = '/services/app/Staff/Create'

        await instance.post(endpoint, user)
        .then((response) => {
            dispatch(registerStaffSuccess(response.data))
            router.push('/login');
        }).catch((error) => {
            dispatch(registerStaffError())
            console.log(error);
        })
    };

    const loginUser = async (user: IUser) => {
        dispatch(loginUserPending());
        const endpoint = `/TokenAuth/Authenticate`;

        await instance.post(endpoint, user)
            .then((response) => {
                const token = response.data.result.accessToken;
                const decoded = decodeToken(token);
                const userRole = decoded[AbpTokenProperies.role];
                const userId = decoded[AbpTokenProperies.nameidentifier];

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("role", userRole);
                sessionStorage.setItem("Id", userId);

                dispatch(loginUserSuccess(token));

                // Redirect based on role
                if (userRole === "Patient") {
                    router.push("/patient");
                } else if (userRole === "Doctor") {
                    router.push("/doctor");
                } else if (userRole === "Nurse") {
                    router.push("/nurse");
                } else {
                    router.push("/homepage");
                }
            })
            .catch((error) => {
                dispatch(loginUserError());
                console.error(error);
            });
    };
return(
    <AuthStateContext.Provider value={state}>
        <AuthActionContext.Provider value={{ registerPatient, registerStaff, loginUser}}>
            {children}
        </AuthActionContext.Provider>
    </AuthStateContext.Provider>
)
}
export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if(!context){
        throw new Error('useAuthState must be used within a AuthProvider');
    }
    return context;
}
export const useAuthActions = () => {
    const context = useContext(AuthActionContext);
    if (!context) {
        throw new Error('useAuthActions must be used within a AuthProvider')
    }
    return context;
}