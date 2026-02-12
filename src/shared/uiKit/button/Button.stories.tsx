import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI Kit/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type TButtonStory = StoryObj<typeof Button>;

export const Primary: TButtonStory = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: TButtonStory = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Outline: TButtonStory = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Ghost: TButtonStory = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Small: TButtonStory = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: TButtonStory = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const FullWidth: TButtonStory = {
  args: {
    children: 'Full width',
    fullWidth: true,
  },
};

export const Disabled: TButtonStory = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
