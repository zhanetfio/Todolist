import {TaskStateType} from "../App"
import {v1} from "uuid";

import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskType} from "../Todolist";

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

const initialState: TaskStateType = {
    count: []
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionTaskType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.todolistId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            copyState[action.todolistId] = filteredTasks;
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state};
            const tasks = copyState[action.todolistId];
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            copyState[action.todolistId] = newTasks;
            return copyState;
        }
        case "CHANGE-TASK-STATUS": {
            const copyTask = {...state};
            copyTask[action.todolistId] = state[action.todolistId].map(t => t.id === action.taskId ? {
                ...t,
                isDone: action.isDone
            } : t)
            state[action.todolistId] = copyTask[action.todolistId]
            return copyTask
        }
        case "CHANGE-TASK-TITLE": {
            let copyTask = state[action.todolistId];
            state[action.todolistId] = copyTask.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const copyState = {...state};
            copyState[action.todolistId] = [];
            return copyState;
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id]
            return copyState;
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
