import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    FieldErrorType,
    RESULT_CODES,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../../../common/utils/errors-utils";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {AppRootActionsType} from "../../../../app/store";

export const setTasksTC = createAsyncThunk('tasks/setTasks', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)

        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId, tasks: res.data.items}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    }
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId: param.todolistId, taskId: param.taskId}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
        return rejectWithValue(null)
    }
})


export const addTaskTC = createAsyncThunk<TaskType,{title:string,todolistId:string},{rejectValue:{errors:Array<string>,fieldsErrors?:Array<FieldErrorType>}}>('tasks/createTask', async (param, {dispatch,rejectWithValue})=>{
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            return res.data.data.item
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            return rejectWithValue ( {errors:res.data.messages,fieldsErrors:undefined})
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
        return rejectWithValue({errors: ['Error'], fieldsErrors: undefined})
    }
})


export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskModelType
}, {dispatch, rejectWithValue, getState}) => {
    const state = getState() as AppRootActionsType
    const task = state.tasks[param.todolistId].find((t: TaskType) => t.id === param.taskId)
    if (!task) {
        return rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...param.model
    }
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
        if (res.data.resultCode === RESULT_CODES.succeeded) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return param
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAppErrorAC({error}))
        }
        return rejectWithValue(null)
    }
})
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}