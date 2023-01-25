import {tasksReducer, TasksStateType} from "./Todolist/Task/tasks-reducer";
import {v1} from "uuid";
import {TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TodolistType} from "../../api/todolist-api";
import {addTodolist} from "./todolists-actions";


const toDoListID_1 = v1();
const toDoListID_2 = v1();
const toDoListID_3 = v1();

let todoList: TodolistDomainType[];
let newTodoList: TodolistType;
let tasks: TasksStateType;
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
    tasks = {
        [toDoListID_1]: [
            {
                id: '0',
                todoListId: '2',
                title: 'HTML/CSS',
                status:TaskStatuses.New,
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
                status:TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',

            }
        ],
        [toDoListID_2]: [
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

            }
        ],
    }
    newTodoList = {
        id: toDoListID_3,
        title: 'New ToDoList',
        order: 0,
        addedDate: ''
    }
})

test('new todo list and task', () => {
    const action = addTodolist.fulfilled( newTodoList, 'requestId', {title:'New ToDoList'})
    const todoListReducerTest = todolistsReducer(todoList, action)
    const tasksReducerTest = tasksReducer(tasks, action)
    expect(todoListReducerTest.length).toBe(3)
    expect(tasksReducerTest[toDoListID_3]).toStrictEqual([])
})