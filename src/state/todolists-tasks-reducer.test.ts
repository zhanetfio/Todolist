import { addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

/*
test('it`s should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistTC.fulfilled(  {todolistId:'3',title: 'new',order:0} ,'requestId', {todolist:'3',title: 'new',order:0}/!*todolist.id:'',title:'New',addedDate:'',order:0}}*!/);
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist);
    expect(idFromTodolists).toBe(action.payload.todolist);
});*/
