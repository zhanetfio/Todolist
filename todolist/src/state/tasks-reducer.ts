import {AddTodolistAT, RemoveTodolistAT, setTodolistsAC} from "./todolists-reducer";
import {
    TaskPriorities,
    TaskType,
    TaskStatuses,
    todolistsAPI,
    RESULT_CODES,
    UpdateTaskModelType
} from "../api/todolist-api";
import {AppThunk, RootState} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/errors-utils";
import axios, {AxiosError} from "axios";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}
export type UpdateTaskAT = {
    type: 'UPDATE-TASK'
    model: UpdateDomainTaskModelType
    todolistId: string
    taskId: string
}
/*export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
export type  ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}*/
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
export type ActionTaskType =
    RemoveTaskAT
    | AddTaskAT
    | UpdateTaskAT
  /*  | ChangeTaskTitleAT
    | ChangeTaskStatusAT*/
    | AddTodolistAT
    | RemoveTodolistAT
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {
    // count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTaskType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        }
        /* case "CHANGE-TASK-STATUS": {
             const copyTask = {...state};
             copyTask[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId
                 ? {...t, status: action.status}
                 : t)
             state[action.todolistId] = copyTask[action.todolistId]
             return copyTask
         }
         case "CHANGE-TASK-TITLE": {
             let copyTask = state[action.todolistId];
             state[action.todolistId] = copyTask.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
             return ({...state})
         }*/
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id]
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            return {
                ...state, [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
}

//ActionCreators
export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskId: taskId
    }
}
export const addTaskAC = (
    task: TaskType): AddTaskAT => {
    return {
        type: 'ADD-TASK',
        task

    }
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskAT =>{
    return {
        type: 'UPDATE-TASK',
        model,
        todolistId,
        taskId
    }}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        todolistId,
        tasks
    } as const
}

// ThunkCreators
export const setTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })

}
export const removeTasksTC = (todolistId: string, taskId: string): AppThunk => async dispatch => {
    await todolistsAPI.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC(todolistId, taskId))
}


export const addTaskTC = (todolistId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.createTask(todolistId, title).then(res => {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(addTaskAC( task))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError<{ item: TaskType }>(res.data, dispatch)
        }
    }).catch((e:AxiosError) => {
        const error=e.response
            ? (e.response.data as({error:string})).error
            : e.message
        dispatch(setAppErrorAC(error))
        handleServerNetworkError(e,dispatch)
    })
}



export const updateTaskTC = (todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => RootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
        console.warn('task not found')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
    }
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(todolistId, taskId,apiModel)
            .then((res) => {
                if(res.data.resultCode === RESULT_CODES.succeeded){

                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            }).catch((e) => {
        const err = e as Error | AxiosError
        if(axios.isAxiosError(err)){
            const error=err.response?.data ? (err.response.data as {error:string}).error : err.message
            dispatch(setAppErrorAC(error))
        }
        handleServerNetworkError(e, dispatch)
    })
}