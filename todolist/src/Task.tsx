import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (todolistId: string, id: string) => void
    changeTaskTitle: (todolistId: string, value: string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }
    const onChangeTitleHandler = useCallback((value: string) => props.changeTaskTitle(props.task.id, value, props.todolistId), [props.changeTaskTitle,props.todolistId, props.task.id])
    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            color="primary"
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} changeTitle={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}><Delete/>
        </IconButton>
    </div>
})