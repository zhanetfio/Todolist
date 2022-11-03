import React from 'react'
import {Provider} from "react-redux";
import {RootState } from "./store";
import {combineReducers,  legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
const initialGlobalState = {};

export const storyBookStore = legacy_createStore(rootReducer,initialGlobalState as RootState);

export const ReduxStoreProviderDecorator = (storyFn: ()=>JSX.Element) =>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}