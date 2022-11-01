import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import { useAppSelector} from "./state/hooks";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "./features/TodolistsList/TodolistList";



function App() {

    const status = useAppSelector((state=>state.app.status))
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status ==='loading'&& <LinearProgress color='secondary'/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}


export default App;
