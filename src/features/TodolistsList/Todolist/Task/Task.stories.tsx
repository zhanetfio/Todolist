import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../../app/ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolist-api";

export default {                                    //по дефолту создаётся компонент в StoryBook
    title: 'ToDoList/Task',                        //имя папки и в ней раздел
    component: Task,                               //компонента которую мы используем
    argTypes: {                                     //описываем свойства нашей компоненты
        task: {
            description: 'tasks props',    //описание пропса
            table: {category: 'Main'}       //раздел в котором будет настройка
        },
        todolistId: {
            description: 'todoList ID',    //описание пропса
            table: {category: 'Main'}       //раздел в котором будет настройка
        },
    },
    args: {                     //значение (пропсы) будет пренадлежать всем историям по умолчанию
        todolistID: '1',
    },
    decorators: [ReduxStoreProviderDecorator]        //тут хок который вернёт компоненту
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>

export const TaskPrimaryIsDoneFalse = Template.bind({});
TaskPrimaryIsDoneFalse.args = {
    task: {
        id: '1',
        todoListId: '2',
        title: 'HTML/CSS',
        status: TaskStatuses.New,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',

    }
}

export const TaskPrimaryIsDoneTrue = Template.bind({});
TaskPrimaryIsDoneTrue.args = {
    task: {
        id: '1',
        todoListId: '2',
        title: 'JS/TS',
        status: TaskStatuses.Completed,
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
    }
}