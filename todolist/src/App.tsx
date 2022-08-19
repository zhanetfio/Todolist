import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id:v1(), title: "CSS&HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false}
    ])


const addTask=(title:string)=>{
        const newTask={id:v1(), title:title , isDone:false}
    setTasks([newTask, ...tasks])

}
    const removeTask = (id: string) => {
        setTasks(tasks.filter(f => f.id !== id))
    }
    const changeStatus=(taskId:string, isDone:boolean)=>{
        let task=tasks.find(t=>t.id===taskId)
        if(task){
           task.isDone=isDone
        }
        setTasks([...tasks])
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    let taskForTodolist=tasks;
    if(filter ==="completed"){
        taskForTodolist = tasks.filter(t=>t.isDone);
    }
    if(filter === "active"){
        taskForTodolist = tasks.filter(t=>!t.isDone)
    }

    return (
        <div className='App'>
            <Todolist
                title={"What to learn"}
                tasks={taskForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                filter={filter}

            />
        </div>
    );
}

export default App;
