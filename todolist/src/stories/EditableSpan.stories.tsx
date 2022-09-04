import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {EditableSpan} from "../EditableSpan";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
args:{
    onChange: {
      description: "Value EditableSpan changed"
    },
  value: {
      defaultValue: "HTML",
    description: "Start value EditableSpan"
  }
},
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
changeTitle:action("Value EditableSpan changed")
}
