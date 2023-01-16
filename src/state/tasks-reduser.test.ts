import {addTaskAC,  removeTaskTC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {addTodolistTC, removeTodolistTC} from "./todolists-reducer";

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
