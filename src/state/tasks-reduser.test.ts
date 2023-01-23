import {

    addTaskTC,
    removeTaskTC,
    setTasksTC,
    tasksReducer,
    TasksStateType,
     updateTaskTC
} from './tasks-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";
import { removeTodolistTC} from "./todolists-reducer";
import {v1} from "uuid";

/*
let startState: TasksStateType = {}
test('correct task should be deleted from correct array', () => {

    const action = removeTaskTC.fulfilled({todolistId: "todolistId2",taskId:"2"},'requestId',{todolistId: "todolistId2",taskId:"2"},);
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });
});

test('correct task should be added to correct array', () => {

    const action = addTaskAC( {task:{ description: '',
        title: "juice",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline:'' ,
        id: '1',
        todoListId: "todolistId2",
        order: 0,
        addedDate: ''}});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(0);
})


test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskId:'2',model:{status:0},todolistId:'todolistId2'});
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].id).toBe("2");
    expect(endState["todolistId2"][1].status).toBe(action.payload.model.status);
});


test('title of specified task should be changed', () => {

    const action = updateTaskAC({taskId:'2',model:{title:"butter"},todolistId:'todolistId2'});
    const endState = tasksReducer(startState, action)
    expect(endState["todolistId2"][1].id).toBe("2");
    expect(endState["todolistId2"][1].title).toBe("butter");
    expect(endState["todolistId2"].length).toBe(3);

});
let todolist={
    id: '2',
    title: "string",
    addedDate: 'string',
    order: 0
}
test('new properties with new array should be added when new todolist is added', () => {

    const action = addTodolistTC.fulfilled({todolist:todolist},'requestId',todolist.title);
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('property with todolistId should be deleted', () => {

    const action = removeTodolistTC.fulfilled({todolistId:"todolistId2"},'requestId',todolist.id);
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
*/



const toDoListID_1 = v1();
const toDoListID_2 = v1();
const toDoListID_3 = v1();
const taskID_1 = v1()

let tasks: TasksStateType;
let newTask: TaskType;
let updateTask: TaskType;
beforeEach(() => {
    tasks = {
        [toDoListID_1]: [
            {
                id: '0',
                todoListId: toDoListID_1,
                title: 'HTML/CSS',
                status:TaskStatuses.New,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority:TaskPriorities.Low,
                description: '',

            },
            {
                id: '1',
                todoListId: toDoListID_1,
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
        [toDoListID_2]: [
            {
                id: '0',
                todoListId: toDoListID_2,
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
    newTask = {
        id: taskID_1,
        todoListId: toDoListID_1,
        title: 'Hello',
        status: TaskStatuses.New,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    }
    updateTask = {...tasks[toDoListID_1][0], title: 'Update task'}
})

test('get tasks', () => {
    const action = setTasksTC.fulfilled({todolistId: toDoListID_3, tasks: [newTask, newTask]}, 'requestId', toDoListID_3)
    const tasksReducerTest = tasksReducer(tasks, action)
    expect(tasksReducerTest[toDoListID_3].length).toBe(2)
})
test('add title task', () => {
    const action = addTaskTC.fulfilled( newTask, 'requestId', { todolistId: toDoListID_1, title: "Hello" })
    const tasksReducer1 = tasksReducer(tasks, action)
    expect(tasksReducer1[toDoListID_1].length).toBe(3)
    expect(tasksReducer1[toDoListID_1][0].title).toBe("Hello")
})
test('delete title task', () => {
    const action = removeTaskTC.fulfilled({todolistId: toDoListID_1, taskId: '0'}, 'requestId', {todolistId: toDoListID_1, taskId: '0'})
    const tasksReducerTest = tasksReducer(tasks, action)
    expect(tasksReducerTest[toDoListID_1][0].id).not.toBe('0')
    expect(tasksReducerTest[toDoListID_1].length).toBe(1)
})
test('update task', () => {
    const action = updateTaskTC.fulfilled(undefined, 'requestId', { todolistId: toDoListID_1, taskId: '0', model: {title: 'Yo!!!'} })
    const tasksReducerTest = tasksReducer(tasks, action)
    expect(tasksReducerTest[toDoListID_1].length).toBe(2)
    expect(tasksReducerTest[toDoListID_1][0].title).toBe('Update task')
})
test('delete todo list task', () => {
    const action = removeTodolistTC.fulfilled({ todolistId: toDoListID_1 }, 'requestId',  toDoListID_1 )
    const tasksReducer1 = tasksReducer(tasks, action)
    const keys = Object.keys(tasksReducer1)
    expect(tasksReducer1[toDoListID_1]).toBeUndefined()
    expect(keys.length).toBe(1)
    expect(keys[0]).toBe(toDoListID_2)
})