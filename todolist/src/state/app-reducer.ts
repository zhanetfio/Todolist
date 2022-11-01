export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestErrorType = 'error' | 'info' | 'success' | 'warning'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppStatusActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.value}
        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export type AppSetStatusAT = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}
export const setAppErrorAC = (value: string | null) => {
    return {
        type: 'APP/SET-ERROR',
        value
    } as const
}
export type AppSetErrorAT = {
    type: 'APP/SET-ERROR',
    value: null|string
}
export  type AppStatusActionType = AppSetStatusAT | AppSetErrorAT