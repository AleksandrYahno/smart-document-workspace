import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'UI Kit/Tooltip',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
};

export default meta;

type TTooltipStory = StoryObj<typeof Tooltip>;

export const Top: TTooltipStory = {
  args: {
    content: 'Tooltip text',
    children: 'Hover me',
    position: 'top',
  },
};

export const Bottom: TTooltipStory = {
  args: {
    content: 'Tooltip below',
    children: 'Hover me',
    position: 'bottom',
  },
};

export const Left: TTooltipStory = {
  args: {
    content: 'Tooltip on left',
    children: 'Hover me',
    position: 'left',
  },
};

export const Right: TTooltipStory = {
  args: {
    content: 'Tooltip on right',
    children: 'Hover me',
    position: 'right',
  },
};
