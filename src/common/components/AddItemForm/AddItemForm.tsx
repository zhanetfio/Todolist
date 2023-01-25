import React, {ChangeEvent, memo, useState} from "react";
import { IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void

}

export const  AddItemForm = memo((props: AddItemFormType)=> {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        if(error !==null){
        setError(null)
        }
        if (e.key === "Enter") {
            addTask()
        }
    }
    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addTask}><AddBox /></IconButton>
    </div>
})