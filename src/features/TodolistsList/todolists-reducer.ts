import {TodolistType} from "../../api/todolist-api"
import {RequestStatusType} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, changeTodolistTitleTC, getTodos, removeTodolist} from "./todolists-actions";


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].filter = action.payload.filter;
        },
        changeTodolistStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodos.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: "all", entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[index].title = action.payload.value
        })
    }
})

export const todolistsReducer = slice.reducer

export const {changeTodolistFilterAC,changeTodolistStatusAC} = slice.actions

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
