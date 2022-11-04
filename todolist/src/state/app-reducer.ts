import {AppThunk} from "./store";
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../api/auth";
import {handleServerNetworkError} from "../utils/errors-utils";

//Types
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
export type SetIsInitializeAT={
    type:'APP/SET-IS-INITIALIZE'
    isInitialize:boolean
}

type InitialStateType = typeof initialState
export  type AppStatusActionType = AppSetStatusAT | AppSetErrorAT | SetIsInitializeAT

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string |  null,
    isInitialize: false //as boolean
}


export const appReducer = (state: InitialStateType = initialState, action: AppStatusActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            console.log('case setStatus')
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            console.log('case setError')
            return {...state, error: action.value}
        case 'APP/SET-IS-INITIALIZE':
            console.log('case isInitialize')
            return {...state,isInitialize: action.isInitialize}
        default:
            console.log('return state appReducer')
            return state
    }
}
//ActionCreators
export const setAppStatusAC = (status: RequestStatusType):AppSetStatusAT => {
    return {
        type: 'APP/SET-STATUS',
        status
    }
}

export const setAppErrorAC = (value: string | null):AppSetErrorAT => {
    return {
        type: 'APP/SET-ERROR',
        value
    }
}

export const setIsInitializeAC=(isInitialize:boolean):SetIsInitializeAT=>{
    return{
        type:'APP/SET-IS-INITIALIZE',
        isInitialize
    }
}


//Thunk
export const initializeAppTC = ():AppThunk => (dispatch) => {
    console.log('initialize thunk ')
   authAPI.me().then(res => {
       console.log('get auth.me')
        if (res.data.resultCode === 0) {
            console.log('login resultCode=0,dispatch setIsInitializeAC')
            dispatch(setIsInitializeAC(true))
            dispatch(setIsLoggedInAC(true));
        }
    })
       .catch(error=>{
           handleServerNetworkError(error,dispatch)
       })
       .finally(()=>{
           dispatch(setAppStatusAC('idle'))
           dispatch(setIsInitializeAC(true))
       })
}
