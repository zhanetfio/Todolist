import {authAPI, FieldErrorType, LoginParamsType} from "../../api/todolist-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../common/utils/errors-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


type InitialStateType = typeof initialState
const initialState = {
    isLoggedIn: false,
    id: null as number | null,
    login: null as string | null,
    email: null as string | null
}

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res: any = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}

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


export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res: any = await authAPI.logout()
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


export const asyncActions = {
    loginTC,
    logoutTC
}


export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserInfoAC(state, action: PayloadAction<{ email: string | null, login: string | null, id: number | null }>) {
            state.id = action.payload.id
            state.login = action.payload.login
            state.email = action.payload.email
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }

})


export const authReducer = slice.reducer

export const {setIsLoggedInAC, setUserInfoAC} = slice.actions
