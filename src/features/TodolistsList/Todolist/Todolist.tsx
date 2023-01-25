import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolist-api";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {TodolistDomainType} from "../todolists-reducer";
import {setTasksTC} from "./Task/task-actions";
import {useActions} from "../../../common/hooks/useActions";
import {todoListsActions} from "../index";
import {tasksActions} from "./Task";


type TodolistType = {
    todolist: TodolistDomainType

}

export const Todolist = memo((props: TodolistType) => {

        const dispatch = useAppDispatch()
        const {id, title, filter, entityStatus} = props.todolist

        const {changeTodolistFilterAC, removeTodolist, changeTodolistTitleTC} = useActions(todoListsActions)
        const {addTaskTC} = useActions(tasksActions)
        const tasks = useAppSelector(state => state.tasks[id])

        const addTask = useCallback((title: string) => {
            addTaskTC({todolistId: id, title: title})
        }, [id]);

        const removeTodolistHandler = useCallback(() => {
            removeTodolist(id)
        }, [id])

        const changeTodolistTitle = useCallback((title: string) => {
            changeTodolistTitleTC({todolistId: id, value: title})
        }, [title])

        const onAllClickHandler = useCallback(() => changeTodolistFilterAC({filter: "all", todolistId: id}), [id])
        const onActiveClickHandler = useCallback(() => changeTodolistFilterAC({filter: "active", todolistId: id}), [id])
        const onCompletedClickHandler = useCallback(() => changeTodolistFilterAC({
            filter: "completed",
            todolistId: id
        }), [id])

        let taskForTodolist = tasks
        if (filter === "completed") {
            taskForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed);
        }
        if (filter === "active") {
            taskForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
        }

        useEffect(() => {
            dispatch(setTasksTC(id))
        }, [])

        return (
            <div>
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
                    <IconButton
                        disabled={entityStatus === 'loading'}
                        onClick={removeTodolistHandler}><Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>

                <div>
                    {taskForTodolist.map(t => <Task
                        task={t}
                        todolistId={id}
                        key={t.id}
                    />)
                    }
                </div>
                < div>
                    < Button className={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}
                             color={"primary"}>All
                    </Button>
                    <Button variant={filter === "active" ? "outlined" : "text"}
                            onClick={onActiveClickHandler} color={"secondary"}>Active
                    </Button>
                    <Button className={filter === "completed" ? "outlined" : "text"}
                            onClick={onCompletedClickHandler} color={"success"}>Completed
                    </Button>
                </div>
            </div>
        )
    }
)



