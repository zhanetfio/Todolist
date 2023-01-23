import {authAPI, LoginParamsType} from "../api/todolist-api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerNetworkError} from "../common/utils/errors-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

type InitialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
}

export const loginTC=createAsyncThunk<{isLoggedIn:boolean},LoginParamsType,{rejectValue:{errors:Array<string>,fieldsErrors?:Array<FieldErrorType>}}>('auth/login',async ( param,thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res:any = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
          return {isLoggedIn: true}

        } else {
            handleServerNetworkError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue ( {errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
        return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
        }

})





export const logoutTC=createAsyncThunk('auth/logout', async (param, thunkAPI)=> {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res:any = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))

            return;
        } else {
            handleServerNetworkError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
        return thunkAPI.rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
    }
})




const slice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false},
    reducers: {
    },
    extraReducers: builder=>{
        builder.addCase(loginTC.fulfilled,(state,action)=>{
                state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled,(state,action)=>{
            state.isLoggedIn = false
        })
    }

})


export const authReducer = slice.reducer


 export type FieldErrorType={
     field:string
     error:string
 }