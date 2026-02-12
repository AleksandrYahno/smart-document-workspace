import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'UI Kit/Input',
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type TInputStory = StoryObj<typeof Input>;

export const Default: TInputStory = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: TInputStory = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
  },
};

export const WithError: TInputStory = {
  args: {
    label: 'Username',
    placeholder: 'username',
    error: 'This field is required',
  },
};

export const FullWidth: TInputStory = {
  args: {
    label: 'Full width input',
    placeholder: 'Stretches to container',
    fullWidth: true,
  },
};

export const Disabled: TInputStory = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};
