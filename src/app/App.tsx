import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {ErrorSnackbar} from "../common/components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "../features/TodolistsList/TodolistList";
import {Login} from "../features/Auth/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC} from "./app-reducer";
import {logoutTC} from "../features/Auth/auth-reducer";
import {appSelectors} from './index';
import {authSelectors} from "../features/Auth";
import {Header} from "../features/Header/Header";
import {useActions} from "../common/hooks/useActions";
import {todoListsActions} from "../features/TodolistsList";
import {Menu} from "@material-ui/icons";


function App() {

    const status = useAppSelector(appSelectors.selectStatus)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const {addTodolist} = useActions(todoListsActions)

    const dispatch = useAppDispatch()

    const newTodoListHandler = useCallback((title: string) => dispatch(addTodolist({title: title})), [dispatch])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar sx={{flexGrow: 1}} position="static">
                <Toolbar>
                    <IconButton size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Header title={newTodoListHandler}/>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
                {/* {status === 'loading' && <LinearProgress color='secondary'/>}*/}
            </AppBar>
            <Container className='container' fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistsList/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404:PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to='404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default App;

