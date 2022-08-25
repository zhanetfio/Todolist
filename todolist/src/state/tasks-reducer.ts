import {TaskStateType} from "../App"
import {v1} from "uuid";

import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

export type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}
export type  ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

type ActionTaskType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const tasks = state[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks;
            return copyState
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            const copyTask = {...state};
            copyTask[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t)
            return copyTask
        }
        case "CHANGE-TASK-TITLE": {
            let copyTask = state[action.todolistId];
            state[action.todolistId] = copyTask.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskAT => {
    return {
        type: 'REMOVE-TASK',
        todolistId: todolistId,
        taskId: taskId
    }
}

export const addTaskAC = (todolistId: string, title: string): AddTaskAT => {
    return {
        type: 'ADD-TASK',
        title: title,
        todolistId: todolistId
    }
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todolistId,
        taskId,
        title
    }
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistId,
        taskId,
        isDone
    }
}
