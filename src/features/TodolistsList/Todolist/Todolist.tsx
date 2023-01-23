import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {setTasksTC} from "../../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {FilterValuesType} from "../../../state/todolists-reducer";
import {RequestStatusType} from "../../../state/app-reducer";


type TodolistType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    entityStatus:RequestStatusType
    removeTask: (todolistId: string, id: string) => void
    changeTaskTitle: (todolistId: string,title:string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

    const dispatch=useAppDispatch();

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
            taskForTodolist = props.tasks.filter(t => t.status===TaskStatuses.Completed);
        }
        if (props.filter === "active") {
            taskForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
        }

    useEffect(() => {
        dispatch(setTasksTC(props.id))
    }, [])

        return (
            <div>
                <div><EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolistHandler} disabled={props.entityStatus==='loading'}><Delete/></IconButton>
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
                             color={"primary"}>All
                    </Button>
                    <Button variant={props.filter === "active" ? "outlined" : "text"}
                            onClick={onActiveClickHandler} color={"secondary"}>Active
                    </Button>
                    <Button className={props.filter === "completed" ? "outlined" : "text"}
                            onClick={onCompletedClickHandler} color={"success"}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)



