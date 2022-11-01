import {Dispatch} from "redux";
import {AppStatusActionType, setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import { ResponseType } from '../api/todolist-api'


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch< AppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch:Dispatch< AppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
