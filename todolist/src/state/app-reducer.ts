import {AppThunk} from "./store";
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../api/auth";
import {handleServerNetworkError} from "../utils/errors-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = 'error' | 'info' | 'success' | 'warning'
export type AppSetStatusAT = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}
export type AppSetErrorAT = {
    type: 'APP/SET-ERROR',
    value: null|string
}
const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null |  string,
    isInitialize: false as boolean
}
export type SetIsInitializeAT={
    type:'APP/SET-IS-INITIALIZE'
    isInitialize:boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppStatusActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.value}
        case 'APP/SET-IS-INITIALIZE':
            return {...state,isInitialize: action.isInitialize}
        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType):AppSetStatusAT => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}


export const setAppErrorAC = (value: string | null):AppSetErrorAT => {
    return {
        type: 'APP/SET-ERROR',
        value
    } as const
}

export const setIsInitializeAC=(isInitialize:boolean):SetIsInitializeAT=>{
    return{
        type:'APP/SET-IS-INITIALIZE',
        isInitialize
    }
}

//Thunk
export const initializeAppTC = ():AppThunk => (dispatch) => {
   authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }
    })
       .catch(error=>{
           handleServerNetworkError(error,dispatch)
       })
       .finally(()=>{
           dispatch(setIsInitializeAC(true))
       })
}
export  type AppStatusActionType = AppSetStatusAT | AppSetErrorAT | SetIsInitializeAT