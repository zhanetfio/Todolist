import {useAppDispatch, useAppSelector} from "../../state/hooks";
import React, {useCallback, useEffect} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType,
    getTodosTC,
    removeTodolistTC
} from "../../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper,} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";


export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodosTC())
            //authAPI.me()
        }
    }, [])

    const addTask = useCallback(function (todolistId: string, title: string) {
        dispatch(addTaskTC({todolistId, title}));
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC({todolistId, taskId}));
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, title: string, taskId: string) => {
        dispatch(updateTaskTC({todolistId, taskId,model: {title: title}}))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC({todolistId, taskId, model: {status}}))
    }, [dispatch])


    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({filter, todolistId}));
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, value: string) => {
        dispatch(changeTodolistTitleTC({todolistId, value}))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }
    return (
        <div>

            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl:any) => {
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

        </div>
    );
}