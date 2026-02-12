import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge';

import styles from './Badge.stories.module.scss';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'UI Kit/Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
  },
};

export default meta;

type TBadgeStory = StoryObj<typeof Badge>;

export const Default: TBadgeStory = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Success: TBadgeStory = {
  args: {
    children: 'Approved',
    variant: 'success',
  },
};

export const Warning: TBadgeStory = {
  args: {
    children: 'Review',
    variant: 'warning',
  },
};

export const Error: TBadgeStory = {
  args: {
    children: 'Rejected',
    variant: 'error',
  },
};

export const AllVariants: TBadgeStory = {
  render: () => (
    <div className={styles.variantsRow}>
      <Badge variant="default">
        draft
      </Badge>
      <Badge variant="success">
        approved
      </Badge>
      <Badge variant="warning">
        review
      </Badge>
      <Badge variant="error">
        rejected
      </Badge>
    </div>
  ),
};
