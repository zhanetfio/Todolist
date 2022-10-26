import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";




export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)


    const addTask = useCallback((todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title);
        dispatch(action);
    },[dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    },[dispatch])
    const changeTaskTitle = useCallback((todolistId: string, title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    },[dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    },[dispatch])

    const changeFilter = useCallback ((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId));
    },[dispatch])
    const removeTodolist =useCallback ((todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatch(action)
    },[dispatch])
    const addTodolist =useCallback( (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    },[])
    const changeTodolistTitle =useCallback( (todolistId: string, value: string) => {
        const action = changeTodolistTitleAC(todolistId, value);
        dispatch(action)
    },[dispatch])

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
                    {todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let taskForTodolist = allTodolistTasks;


                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
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

export default AppWithRedux;
