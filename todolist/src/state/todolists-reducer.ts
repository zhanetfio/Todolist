import {FilterValuesType, TodolistType} from "../App"
import {v1} from "uuid";


export type RemoveTodolistAT={
    type: 'REMOVE-TODOLIST',
    id:string
}
export type AddTodolistAT={
    type: 'ADD-TODOLIST',
    title:string,
    todolistId:string
}
export type ChangeTodolistTitleAT={
    type:'CHANGE-TODOLIST-TITLE',
    id:string,
    value:string
}
export type  ChangeTodolistFilterAT={
    type:'CHANGE-TODOLIST-FILTER',
    id:string,
    filter:FilterValuesType
}

type ActionTodolistType =RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState:Array<TodolistType>=[]

 export const todolistsReducer=(state:Array<TodolistType>=initialState, action: ActionTodolistType):Array<TodolistType> =>{
    switch(action.type){
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD-TODOLIST":{
            return [...state, {
                id:action.todolistId,
                title: action.title,
                filter:'all'
            }]}
        case 'CHANGE-TODOLIST-TITLE':
        {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.value;
            }
                return [...state]
            }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
            default:
               return  state
    }
 }

 export const removeTodolistAC=(todolistId:string):RemoveTodolistAT => {
     return {
         type: 'REMOVE-TODOLIST',
         id:todolistId
     }
 }

export const addTodolistAC = (title:string,):AddTodolistAT =>{
    return {
        type: 'ADD-TODOLIST',
        title:title,
        todolistId:v1()
    }
}
export const changeTodolistTitleAC=(todolistId:string, value:string):ChangeTodolistTitleAT =>{
   return {
       type: 'CHANGE-TODOLIST-TITLE',
       id: todolistId,
       value: value
   }
}
export const  changeTodolistFilterAC=(filter:FilterValuesType, todolistId: string):ChangeTodolistFilterAT=>{
   return {
       type: 'CHANGE-TODOLIST-FILTER',
       id: todolistId,
       filter: filter
   }
}
