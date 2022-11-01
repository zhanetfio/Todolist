import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../api/todolist-api";



let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistDomainType> = [];

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let todolist:TodolistType = {id:'',title:"New Todo", addedDate:'',order:0};

    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todo");
    expect(endState[2].filter).toBe('all');
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)
    const endState = todolistsReducer(startState, action);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const startState: Array<TodolistDomainType> = [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate:'',order:0,entityStatus:"succeeded"},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate:'',order:0,entityStatus:"succeeded"}
    ]
    const action = changeTodolistFilterAC(newFilter, todolistId2);
    const endState = todolistsReducer(startState, action);
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
