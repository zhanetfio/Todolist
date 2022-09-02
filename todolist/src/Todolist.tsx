import React, { useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button,  IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

        const addTask = useCallback((title: string) => {
            props.addTask(props.id, title)
        }, [props.addTask, props.id]);

        const removeTodolistHandler = () => {
            props.removeTodolist(props.id)
        }

        const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(props.id, title)
        }, [props.changeTodolistTitle, props.id])

        const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
        const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
        const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

        let taskForTodolist = props.tasks

        if (props.filter === "completed") {
            taskForTodolist = props.tasks.filter(t => t.isDone);
        }
        if (props.filter === "active") {
            taskForTodolist = props.tasks.filter(t => !t.isDone)
        }

        return (
            <div>
                <div><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolistHandler}><Delete/></IconButton>
                </div>
                <AddItemForm addItem={addTask}/>

                <div>
                    {taskForTodolist.map(t => <Task
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />)
                    }
                </div>
                < div>
                    < Button className={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}
                             color={"default"}>All
                    </Button>
                    <Button variant={props.filter === "active" ? "outlined" : "text"}
                            onClick={onActiveClickHandler} color={"primary"}>Active
                    </Button>
                    <Button className={props.filter === "completed" ? "outlined" : "text"}
                            onClick={onCompletedClickHandler} color={"secondary"}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)



