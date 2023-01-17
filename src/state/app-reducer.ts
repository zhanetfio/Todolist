import {authAPI} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
           return {isLoggedIn:true}
            // dispatch(setUserInAC(res.data.data))
        }
        return rejectWithValue(null)
    } catch (error) {
        return rejectWithValue(null)
    }
})
const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        isInitialize: false
    },
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled,(state)=>{
           state.isInitialize=true
        })
    }
})

export const appReducer = slice.reducer

export const setAppStatusAC = slice.actions.setAppStatusAC
export const setAppErrorAC = slice.actions.setAppErrorAC




//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//export type RequestErrorType = 'error' | 'info' | 'success' | 'warning'
/*
export type AppSetStatusAT = {
    type: 'APP/SET-STATUS',
    status: RequestStatusType
}
export type AppSetErrorAT = {
    type: 'APP/SET-ERROR',
    value: null | string
}
export type SetIsInitializeAT = {
    type: 'APP/SET-IS-INITIALIZE'
    isInitialize: boolean
}
*/

//type InitialStateType = typeof initialState
//export  type AppStatusActionType = AppSetStatusAT | AppSetErrorAT | SetIsInitializeAT