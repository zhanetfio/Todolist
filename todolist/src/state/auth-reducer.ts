import {authAPI, LoginParamsType} from "../api/auth";
import {AppSetErrorAT, AppSetStatusAT,  setAppStatusAC} from "./app-reducer";
import {AppThunk} from "./store";
import {handleServerNetworkError} from "../utils/errors-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean):SetIsLoggedInAT =>
    ({type: 'login/SET-IS-LOGGED-IN', value} )

// thunks
export const loginTC = (data: LoginParamsType):AppThunk => async (dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    await authAPI.login(data).then(res=> {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }
    }).catch((e) => {
        handleServerNetworkError(e,dispatch)
    })
}
export const logoutTC = ():AppThunk => async (dispatch)=> {
    dispatch(setAppStatusAC('loading'))
    await authAPI.logout().then(res=> {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        }
    }).catch((e) => {
        handleServerNetworkError(e,dispatch)
    })
}

// types
export type SetIsLoggedInAT={
    type: 'login/SET-IS-LOGGED-IN'
    value:boolean
}
export type AuthActionsType = SetIsLoggedInAT | AppSetStatusAT | AppSetErrorAT