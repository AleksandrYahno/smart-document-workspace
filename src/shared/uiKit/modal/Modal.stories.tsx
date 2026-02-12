import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Modal from './Modal';
import { Button } from '../button';
import type { IModalProps } from './modal.interface';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'UI Kit/Modal',
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;

type TModalStory = StoryObj<typeof Modal>;

function DefaultStory(args: Partial<IModalProps>): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <p>
          Modal content goes here.
        </p>
      </Modal>
    </>
  );
}

function WithoutTitleStory(args: Partial<IModalProps>): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <p>
          No title, close button only.
        </p>
      </Modal>
    </>
  );
}

function NarrowStory(args: Partial<IModalProps>): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open narrow
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        width="320px"
      >
        <p>
          Narrow modal (320px).
        </p>
      </Modal>
    </>
  );
}

export const Default: TModalStory = {
  render: (args) => <DefaultStory {...args} />,
  args: {
    title: 'Modal title',
    showCloseButton: true,
  },
};

export const WithoutTitle: TModalStory = {
  render: (args) => <WithoutTitleStory {...args} />,
  args: {
    showCloseButton: true,
  },
};

export const Narrow: TModalStory = {
  render: (args) => <NarrowStory {...args} />,
  args: {
    title: 'Narrow',
  },
};
