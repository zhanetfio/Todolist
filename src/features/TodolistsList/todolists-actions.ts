import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {RESULT_CODES, todolistsAPI, TodolistType} from "../../api/todolist-api";
import {handleServerNetworkError} from "../../common/utils/errors-utils";
import axios from "axios";

export const getTodos = createAsyncThunk('todolists/getTodos', async (param, {dispatch, rejectWithValue}) => {
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
export const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === RESULT_CODES.succeeded ) {
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
export const addTodolist = createAsyncThunk<TodolistType,{title: string}>('todolists/addTodolist', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(param.title)
        if (res.data.resultCode ===  RESULT_CODES.succeeded) {
            return res.data.data.item
        } else {
            handleServerNetworkError('Something wrong', dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
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
        if (res.data.resultCode ===  RESULT_CODES.succeeded) {
            // dispatch(setAppStatusAC({status: 'succeeded'}))
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