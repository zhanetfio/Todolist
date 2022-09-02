import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "completed" | "active"

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: v1(), title: "what to learn", filter: "all"},
        {id: v1(), title: "what to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const newTask = {id: v1(), title: title, isDone: false}
        const copyTask = {...tasks}
        copyTask[todolistId] = [newTask, ...tasks[todolistId]]
        setTasks(copyTask)
    }
    const removeTask = (todolistId: string, id: string) => {
        const copyTask = {...tasks};
        copyTask[todolistId] = tasks[todolistId].filter(f => f.id !== id)
        setTasks(copyTask)
    }
    const changeTaskTitle = (todolistId: string, value: string, id: string) => {
        let copyTask = tasks[todolistId];
        let task = copyTask.find(t => t.id === id);
        if (task) {
            task.title = value;
            setTasks({...tasks})
        }
    }
        const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const copyTask = {...tasks};
        copyTask[todolistId] = tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)
        setTasks(copyTask)
    }



    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const addTodolist = (title: string) => {
        const todolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }
    const changeTodolistTitle = (todolistId: string, value: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.title = value;
            setTodolists([...todolists])
        }

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

export default App;
