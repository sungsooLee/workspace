import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Editor from './index';

export default {
  title: 'Components/Editor',
  component: Editor,
} as Meta<typeof Editor>;

const Template: StoryFn<typeof Editor> = (args) => <Editor />;

export const Primary = Template.bind({});
Primary.args = {};
