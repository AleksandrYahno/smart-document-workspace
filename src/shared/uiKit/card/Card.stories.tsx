import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'UI Kit/Card',
  tags: ['autodocs'],
};

export default meta;

type TCardStory = StoryObj<typeof Card>;

export const Default: TCardStory = {
  args: {
    children: (
      <p>
        Card content without title.
      </p>
    ),
  },
};

export const WithTitle: TCardStory = {
  args: {
    title: 'Card title',
    children: (
      <p>
        Card body content.
      </p>
    ),
  },
};

export const WithRichContent: TCardStory = {
  args: {
    title: 'Document',
    children: (
      <>
        <p>
          Description or summary text.
        </p>
        <p>
          Additional paragraph.
        </p>
      </>
    ),
  },
};
