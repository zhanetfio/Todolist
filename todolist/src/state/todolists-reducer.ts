import {todolistsAPI, TodolistType} from "../api/todolist-api"
import {AppActionsType, AppThunk} from "./store";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";


export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    value: string
}
export type  ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
type SetTodolistAT = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

export type ActionTodolistType =
    RemoveTodolistAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistAT
    | ReturnType<typeof changeTodolistStatusAC>

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTodolistType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST": {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.value;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map((tl => ({...tl, filter: 'all', entityStatus: 'idle'})))
        }
        case 'TODO/CHANGE-TODOLIST-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, status: action.status} : tl)
        }
        default:
            return state
    }
}
//ActionCreators
export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistAT => {
    return {
        type: 'ADD-TODOLIST',
        todolist
    }
}
export const changeTodolistTitleAC = (todolistId: string, value: string): ChangeTodolistTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId,
        value: value
    }
}
export const changeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: filter
    }
}
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistAT => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } //as const
}
export const changeTodolistStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'TODO/CHANGE-TODOLIST-STATUS',
    id,
    status
} as const)

//ThunkCreators
export const getTodosTC = (): AppThunk => {
    console.log('enter getTodos thunk')
    return (dispatch) => {
        todolistsAPI.getTodolists().then(res =>
            dispatch(setTodolistsAC(res.data)))
    }
}
export const removeTodolistTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    await todolistsAPI.deleteTodolist(todolistId)
    dispatch(removeTodolistAC(todolistId))
    dispatch(setAppStatusAC('succeeded'))
}
export const addTodolistTC = (title: string): AppThunk => async dispatch => {
    console.log('enter addTodolist thunk')
    const res = await todolistsAPI.createTodolist(title)
    dispatch(addTodolistAC(res.data.data.item))
}
export const changeTodolistTitleTC = (todolistId: string, value: string): AppThunk => async dispatch => {
    await todolistsAPI.updateTodolist(todolistId, value)
    dispatch(changeTodolistTitleAC(todolistId, value))
}
