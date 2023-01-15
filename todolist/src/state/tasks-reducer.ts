import {addTodolistTC, getTodosTC, removeTodolistTC} from "./todolists-reducer";
import {
    RESULT_CODES,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../api/todolist-api";
import {AppRootActionsType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import axios, {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

//Thunks

export const setTasksTC = createAsyncThunk('tasks/setTasks', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolistId, tasks}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
        }
        return rejectWithValue(null)
    }
})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
     try {
         const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
         return {todolistId: param.todolistId, taskId: param.taskId}
     /* if (res.data.resultCode === 0) {
        thunkAPI.dispatch(removeTaskAC(param))
    } else {
        handleServerNetworkError('Something wrong', dispatch)
    }*/
 } catch(error){
          if (axios.isAxiosError(error)) {
              handleServerNetworkError(error.message, thunkAPI.dispatch)
          }
      }
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
  /*  dispatch(setAppStatusAC({status: 'loading'}))*/
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            // dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item

        } else {
            handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(error.message, dispatch)
            return rejectWithValue(null)
        }
    }
})

export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: {
    todolistId: string,
    taskId: string,
    model: UpdateDomainTaskModelType
}, {dispatch, rejectWithValue, getState}) => {
    const state = getState() as AppRootActionsType
    const task = state.tasks[param.todolistId].find((t:any) => t.id === param.taskId)
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
            const action = updateTaskAC(param)
            dispatch(action)
            dispatch(setAppStatusAC({status: 'succeeded'}))
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

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(getTodosTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(setTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })


    }
})

export const tasksReducer = slice.reducer

//ActionCreators
export const removeTaskAC = slice.actions.removeTaskAC

export const addTaskAC = slice.actions.addTaskAC
export const updateTaskAC = slice.actions.updateTaskAC



//Types


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
