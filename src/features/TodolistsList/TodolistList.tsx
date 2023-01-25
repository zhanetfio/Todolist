import { useAppSelector} from "../../common/hooks/hooks";
import React, { useEffect} from "react";
import {Grid, Paper,} from "@material-ui/core";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions} from "../../common/hooks/useActions";
import {todoListsActions} from "./index";


export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {getTodos }= useActions(todoListsActions)


    useEffect(() => {
        if (isLoggedIn) {
            getTodos()
        }

    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'login'}/>
    }
    return (
        <div>
            <Grid container spacing={3}>
                {todolists.map((tl) => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist todolist={tl}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>

        </div>
    );
}
