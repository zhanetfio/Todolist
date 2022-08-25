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
    todolistId: string
    title: string
    tasks: Array<TaskType>
    addTask: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    changeTaskTitle: (todolistId: string, value: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
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
                {props.tasks && props.tasks.map((t) => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked)

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
                <Button className={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}
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

/*  const tasksJSX = props.tasks.length ? props.tasks.map(task => {
          const removeTask = () => props.removeTask(props.todolistId, task.id)
          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
          const changeTaskTitle = (taskTitle: string) => {
              props.changeTaskTitle(task.id, taskTitle, props.id)
          }

          return (
              <li key={task.id} className={task.isDone ? "isDone" : " "}>

                  <Checkbox
                      onChange={changeTaskStatus}
                      checked={task.isDone}
                  />

                  <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                  <IconButton aria-label="delete">
                      <Delete onClick={removeTask}/>
                  </IconButton>
                  {/!* <button onClick={removeTask}>x</button>*!/}
              </li>
          )
      })
      : <span>Your Todolist is empty</span>

  const addTask = (title: string) => props.addTask(title, props.id)


  const removeTodolistHandler = () => {
      props.removeTodolist(props.todolistId)
  }
  const changeTodolistTitle = (todolistTitle: string) => {
      props.changeTodolistTitle(todolistTitle, props.id)
  }
  return (
      <div>
          <h3>
              <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
              <IconButton aria-label="delete">
                  <Delete onClick={removeTodolistHandler}/>
              </IconButton>
          </h3>
          <AddItemForm addItem={addTask}/>
          <ul>
              {tasksJSX}
          </ul>
          <div>

              <Button variant={props.filter === 'all' ? 'outlined' : 'contained'} color='secondary' size={'small'}
                      onClick={() => props.changeFilter('all', props.todolistId)}>All</Button>
              <Button variant={props.filter === "active" ? "outlined" : "contained"} color='primary' size={'small'}
                      onClick={() => props.changeFilter('active', props.todolistId)}>Active</Button>
              <Button variant={props.filter === "completed" ? "outlined" : "contained"} color='secondary'
                      size={'small'}
                      onClick={() => props.changeFilter('completed', props.todolistId)}>Completed</Button>
          </div>
      </div>
  );
}*/