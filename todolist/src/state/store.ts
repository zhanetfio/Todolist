import {ActionTaskType, tasksReducer} from './tasks-reducer';
import {ActionTodolistType, todolistsReducer} from './todolists-reducer';
import { applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppStatusActionType} from "./app-reducer";

const rootReducer = combineReducers({
    app:appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk));

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState,unknown, AppActionsType>

//export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType= ActionTodolistType | ActionTaskType | AppStatusActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState,unknown, AppActionsType>
// @ts-ignore
window.store = store;