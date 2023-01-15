import { tasksReducer} from './tasks-reducer';
import { todolistsReducer} from './todolists-reducer';
import {combineReducers} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import { authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    auth:authReducer,
    app:appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})
//export const store = createStore(rootReducer,applyMiddleware(thunk));

export const store =configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})


//export type AppDispatch = ThunkDispatch<RootState,unknown, AppActionsType>

//export type AppRootStateType = ReturnType<typeof rootReducer>

// export type AppActionsType= ActionTodolistType | ActionTaskType | AppStatusActionType
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown, AppActionsType>
// @ts-ignore
window.store = store;
// типизация state
export type AppRootStateType = ReturnType<typeof store.getState>

// все типы экшенов для всего приложения
export type AppRootActionsType = any

// типизация dispatch
export type AppDispatch = typeof store.dispatch

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>