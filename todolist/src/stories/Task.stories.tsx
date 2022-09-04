import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Task} from "../Task";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action("removeTask"),
        changeTaskTitle: action("changeTaskTitle"),
        changeTaskStatus: action("changeTaskStatus"),
        todolistId: 'aaa'
    }

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'JS', isDone: true})
   return <Task task={task} todolistId={'aaa'} removeTask={action('removeTask')}  changeTaskStatus={()=>setTask({...task,isDone: !task.isDone})} changeTaskTitle={(taskId:string,todolistId:string, value: string)=> setTask({...task, title: value})} />;
}
export const TaskIsDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDone.args = {

    task: {id: '1', title: 'JS', isDone: true},
};

export const TaskIsNotDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDone.args = {
    task: {id: '2', title: 'HTML', isDone: false},
};
