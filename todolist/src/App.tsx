import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useAppDispatch, useAppSelector} from "./state/hooks";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "./features/TodolistsList/TodolistList";
import {Login} from "./features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {initializeAppTC} from "./state/app-reducer";
import {logoutTC} from "./state/auth-reducer";
import {authAPI} from "./api/auth";


function App() {
    console.log('Rendering App')
    const status = useAppSelector(state => state.app.status)
    const isInitialize = useAppSelector(state => state.app.isInitialize)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(' useEffect Initialization')
        dispatch(initializeAppTC())
        return()=>{
            console.log('Unmount!')
        }
    }, [])


    const logoutHandler = () => {
        console.log('logOut handler')
        dispatch(logoutTC())
    }
//     if (isInitialize) {
// debugger
//         console.log('if isInitiazie')
//         return (
//             <div
//                 style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
//                 <CircularProgress/>
//             </div>
//         )
//
//     }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='/404' element={<h1>404:PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='404'/>}/>
                </Routes>
            </Container>
        </div>
    )
}


export default App;
