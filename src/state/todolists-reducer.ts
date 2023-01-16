import {todolistsAPI, TodolistType} from "../api/todolist-api"
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerNetworkError} from "../utils/errors-utils";
import axios from "axios";


//const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

//ThunkCreators
export const getTodosTC = createAsyncThunk('todolists/getTodos', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)

        }
        return rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId}
        } else {
            handleServerNetworkError('Something wrong', dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
        return rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerNetworkError('Something wrong', dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
        return rejectWithValue(null)
    }
})

export const changeTodolistTitleTC = createAsyncThunk('', async (param: { todolistId: string, value: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolist(param.todolistId, param.value)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolistId: param.todolistId, value: param.value}
        } else {
            handleServerNetworkError('Something wrong', dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {

        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },

        changeTodolistStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodosTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.value
        })
    }
})

export const todolistsReducer = slice.reducer

export const changeTodolistFilterAC = slice.actions.changeTodolistFilterAC

