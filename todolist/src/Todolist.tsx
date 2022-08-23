import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

type TodolistType = {
    id:string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistId:string,title: string) => void
    removeTask: (todolistId:string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    changeStatus: (todolistId:string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist:(todolistId:string)=>void
}

export function Todolist(props: TodolistType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.id, props.title)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => {
        props.changeFilter("all",props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active",props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed",props.id)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    return (
        <div>
            <div>{props.title}</div>
            <button onClick={removeTodolistHandler}>X</button>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}

                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => {
                                props.removeTask(props.id, t.id)
                            }
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(props.id,t.id, e.currentTarget.checked)
                            }
                            return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input type='checkbox'
                                       onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>x
                                </button>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}