import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

type TaskPropsType = {
    removeTask: (todolistId: string, id: string) => void
    changeTaskTitle: (todolistId: string, value: string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status:TaskStatuses) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id),[props.todolistId, props.task.id]);

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue? TaskStatuses.Completed:TaskStatuses.New)
    },[props.todolistId, props.task.id])

    const onChangeTitleHandler = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistId)
    }, [props.changeTaskTitle,props.todolistId, props.task.id])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            color="primary"
            onChange={onChangeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed }
        />

        <EditableSpan title={props.task.title} changeTitle={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}><Delete/>
        </IconButton>
    </div>
})