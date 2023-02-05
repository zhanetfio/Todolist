import {AddItemForm} from "./AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title:'ToDoList/AddItemForm',
    component:AddItemForm,
    argTypes:{
        addItem:{
            description:'Button clicked inside form'
        }
    },
} as ComponentMeta<typeof AddItemForm>;

const Template:ComponentStory<typeof AddItemForm>= (args)=><AddItemForm {...args}/>;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args={
    addItem:action('Button clicked inside form')
}