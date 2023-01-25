import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../common/components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {useActions} from "../../../../common/hooks/useActions";
import {tasksActions} from "./index";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {

    const {removeTaskTC, updateTaskTC} = useActions(tasksActions)

    const deleteHandler = useCallback(() => removeTaskTC({
        todolistId: props.todolistId,
        taskId: props.task.id
    }), [props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        updateTaskTC({todolistId: props.todolistId, taskId: props.task.id, model: {status}})
    }, [props.todolistId, props.task.id])

    const onChangeTitleHandler = useCallback((value: string) => {
        updateTaskTC({todolistId: props.todolistId, taskId: props.task.id, model: {title: value}})
    }, [props.todolistId, props.task.id])

    return (
        <div>
            <Checkbox
                color="primary"
                onChange={onChangeStatusHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.task.title} changeTitle={onChangeTitleHandler}/>
            <IconButton onClick={deleteHandler}><Delete/>
            </IconButton>
        </div>
    )
})