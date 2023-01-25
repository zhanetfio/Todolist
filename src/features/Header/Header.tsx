import React, {memo, useCallback} from 'react';
import {useAppSelector} from "../../common/hooks/hooks";
import {Box, Container, Grid, Typography} from "@material-ui/core";
import {AddItemForm} from "../../common/components/AddItemForm/AddItemForm";
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions} from "../../common/hooks/useActions";
import {todoListsActions} from "../TodolistsList";


type ButtonAppBarPropsType = {
    title: (title: string) => void
}

export const Header = memo((props: ButtonAppBarPropsType) => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {addTodolist} = useActions(todoListsActions)

    const addNewTodolist = useCallback((title: string) => {
        addTodolist({title})
    }, [])


    return (
        <Box sx={{flexGrow: 1}} >
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                <Container fixed>
                    {isLoggedIn
                        ? <Grid container spacing={2}>
                            <Grid item style={{marginTop: '5px'}}>
                                New Todolist
                            </Grid>
                            <Grid item>
                                <AddItemForm addItem={addNewTodolist}/>
                            </Grid>
                        </Grid>
                        : <Grid container spacing={2}>
                            <Grid item style={{marginTop: '5px'}}>
                                Welcome to todo list app
                            </Grid>
                        </Grid>
                    }
                </Container>
            </Typography>
        </Box>
    );
})
