import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "completed" | "active"

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: v1(), title: "what to learn", filter: "all"},
        {id: v1(), title: "what to buy", filter: "all"}
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS&HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ]
        ,
        [todolistId2]: [
            {id: v1(), title: "bookL", isDone: false},
            {id: v1(), title: "Bread", isDone: true}
        ]
    })

    const addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title);
        dispatchToTasks(action);

    }
    const removeTask = (todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId);
        dispatchToTasks(action);
    }
    const changeTaskTitle = (todolistId: string, title: string, taskId: string) => {
        const action = changeTaskTitleAC(todolistId
            , taskId, title);
        dispatchToTasks(action)
    }
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone);
        dispatchToTasks(action)
    }


    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(filter, todolistId);
        dispatchToTodolists(action);
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }
    const changeTodolistTitle = (todolistId: string, value: string) => {
        const action = changeTodolistTitleAC(todolistId, value);
        dispatchToTodolists(action)
    }

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu"><Menu/></IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists && todolists.map((tl) => {
                        let taskForTodolist = tasks[tl.id];
                        if (tl.filter === "completed") {
                            taskForTodolist = taskForTodolist.filter(t => t.isDone);
                        }
                        if (tl.filter === "active") {
                            taskForTodolist = taskForTodolist.filter(t => !t.isDone)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={taskForTodolist}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeTaskTitle={changeTaskTitle}
                                    changeFilter={changeFilter}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}

                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
