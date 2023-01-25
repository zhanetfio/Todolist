import {TaskType} from "../../../../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTaskTC, removeTaskTC, setTasksTC,  updateTaskTC} from "./task-actions";
import {addTodolist, getTodos, removeTodolist} from "../../todolists-actions";

/*const initialState=typeof TasksDomainType={} ;*/

//Thunks

const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
        changeTaskStatusAC(state,action:PayloadAction<{todolistId:string,taskId:string/*,entityStatus:RequestStatusType*/}>){
           /* const index =*/ state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
           /* state[action.payload.todolistId][index].entityStatus=action.payload.entityStatus*/
        }
        /*removeTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },*/

    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(getTodos.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl) => {
                state[tl.id] = []
            })
        });
        builder.addCase(setTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskTC.fulfilled,(state,action)=>{
            const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            if (index > -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        });
        builder.addCase(addTaskTC.fulfilled,(state,action)=>{
            state[action.payload.todoListId].unshift(action.payload)

        });
        builder.addCase(updateTaskTC.fulfilled,(state,action)=>{
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }


        })


    }
})

export const tasksReducer = slice.reducer

//ActionCreators
/*
export const removeTaskAC = slice.actions.removeTaskAC

export const addTaskAC = slice.actions.addTaskAC
export const updateTaskAC = slice.actions.updateTaskAC
*/
export const {changeTaskStatusAC}=slice.actions


//Types


export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}
/*
export type TasksDomainType = TasksStateType & {
    entityStatus: RequestStatusType
}*/
