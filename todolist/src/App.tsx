import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let task1=[
        {id: "1",title: "CSS&HTML", isDone: true},
        {id: "2",title: "JS", isDone: true},
        {id: "3",title: "React", isDone: false}
    ]
    let task2=[
        {id: "1",title: "Milk", isDone: true},
        {id: "2",title: "Butter", isDone: false},
        {id: "3",title: "Eggs", isDone: true}
    ]

    return (
        <div className='App'>
           <Todolist title={"What to learn"} tasks={task1} />
           <Todolist title={"What to buy"} tasks={task2} />

        </div>
    );
}

export default App;
