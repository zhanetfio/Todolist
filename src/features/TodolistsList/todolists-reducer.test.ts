import {
    changeTodolistFilterAC,
     TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../../api/todolist-api";
import {addTodolist, changeTodolistTitleTC, removeTodolist} from "./todolists-actions";


const toDoListID_1 = v1();
const toDoListID_2 = v1();
const toDoListID_3 = v1();

let todoList: TodolistDomainType[];
let newTodoList: TodolistType;
beforeEach(() => {
    todoList = [
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
    ]


    newTodoList = {
        id: toDoListID_3,
        title: 'New ToDoList',
        order: 0,
        addedDate: ''
    }
})

test('filter changes', () => {
    const todoListReducer1 = todolistsReducer(todoList, changeTodolistFilterAC({
        todolistId: toDoListID_1,
        filter: "active"
    }))
    const todoListReducer2 = todolistsReducer(todoList, changeTodolistFilterAC({
        todolistId: toDoListID_2,
        filter: "completed"
    }))
    expect(todoListReducer1[0].filter).toBe("active")
    expect(todoListReducer2[1].filter).toBe("completed")
})

test('add toDoList', () => {
    const action = addTodolist.fulfilled(newTodoList, 'requestId', {title: 'New ToDoList'})
    const todoListReducerTest = todolistsReducer(todoList, action)
    expect(todoListReducerTest.length).toBe(3)
})

test('change toDoList new title', () => {
    const action = changeTodolistTitleTC.fulfilled({
        todolistId: toDoListID_1,
      value:"New Name ToDoList"
    }, 'requestId', {todolistId: toDoListID_1, value: "New Name ToDoList"})
    const todoListReducerTest = todolistsReducer(todoList, action)
    expect(todoListReducerTest[0].title).toBe('New Name ToDoList')
})

test('delete toDoList', () => {
    const action = removeTodolist.fulfilled({todolistId: toDoListID_1}, 'requestId',  toDoListID_1)
    const todoListReducerTest = todolistsReducer(todoList, action)
    expect(todoListReducerTest[0].id).not.toBe(toDoListID_1)
    expect(todoListReducerTest.length).toBe(1)
})