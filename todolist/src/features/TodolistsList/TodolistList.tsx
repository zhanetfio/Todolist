import {useAppDispatch, useAppSelector} from "../../state/hooks";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType,
    getTodosTC,
    removeTodolistTC
} from "../../state/todolists-reducer";
import {authApi} from "../../api/auth";
import {addTaskTC, removeTasksTC, updateTaskTC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";


export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodosTC())
        authApi.me()
    }, [])

    const addTask = useCallback(function (todolistId: string, title: string) {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTasksTC(todolistId, taskId));
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, title: string, taskId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title: title}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])


    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId));
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, value: string) => {
        dispatch(changeTodolistTitleTC(todolistId, value))
    }, [dispatch])


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
                                    entityStatus={tl.entityStatus}
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