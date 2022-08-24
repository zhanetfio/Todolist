import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    changeTaskTitle: (todolistId: string, value: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
}

export function Todolist(props: TodolistType) {

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    return (
        <div>
            <div><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
            </div>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(props.id, t.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.id, t.id, e.currentTarget.checked)
                        }
                        const onChangeTitleHandler = (value: string) => props.changeTaskTitle(t.id, value, props.id)


                        return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox color="primary"
                                      onChange={onChangeStatusHandler}
                                      checked={t.isDone}/>
                            <EditableSpan title={props.title} changeTitle={onChangeTitleHandler}/>
                            <IconButton onClick={onClickHandler}><Delete/>
                            </IconButton>
                        </div>
                    })
                }

            </div>
            <div>
                <Button className={props.filter === "all" ?  "outlined" : "text"} onClick={onAllClickHandler}
                        color={"default"}>All
                </Button>
                <Button variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveClickHandler} color={"primary"}>Active
                </Button>
                <Button className={props.filter === "completed" ?  "outlined" : "text"}
                        onClick={onCompletedClickHandler} color={"secondary"}>Completed
                </Button>
            </div>
        </div>
    )
}

