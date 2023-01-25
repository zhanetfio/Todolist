import React from 'react'
import {Provider} from "react-redux";
import {combineReducers,  legacy_createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/Todolist/Task/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {AppRootStateType} from "./store";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState = {};

export const storyBookStore = legacy_createStore(rootReducer,initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: ()=>JSX.Element) =>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}