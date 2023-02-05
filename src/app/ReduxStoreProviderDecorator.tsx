import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {AppRootStateType} from "./store";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {tasksReducer } from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import { todolistsReducer} from "../features/TodolistsList/todolists-reducer";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    auth: {
        isLoggedIn: false,
        id: null,
        login: null,
        email: null
    },
    app: {
        status: 'succeeded',
        error: null,
        isInitialize: false
    },
    todolists: [
        {
            id: '1',
            title: 'HTML/CSS',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        },
        {
            id: '2',
            title: 'JS/TS',
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        },
    ] ,
    tasks: {
        ['todolistId1']: [
            {
                id: '0',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
            {
                id: '1',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
            {
                id: 2,
                todoListId: 2,
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
            {
                id: '3',
                todoListId: '2',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
        ],
        ['todolistId2']: [
            {
                id: '0',
                todoListId: '3',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
            {
                id: '1',
                todoListId: '3',
                title: 'HTML/CSS',
                status: TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            },
        ],
    }
} ;

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}






















