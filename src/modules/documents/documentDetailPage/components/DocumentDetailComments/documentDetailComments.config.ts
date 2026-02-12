import type { IComment } from './documentDetailComments.interface';

export const INITIAL_COMMENTS: IComment[] = [
  {
    id: 'c1',
    author: 'John Doe',
    text: 'Please review the second section when you have time.',
    date: '2025-02-10T14:00:00Z',
  },
  {
    id: 'c2',
    author: 'Jane Smith',
    text: 'Looks good to me. I added a few notes in the doc.',
    date: '2025-02-10T15:30:00Z',
  },
  {
    id: 'c3',
    author: 'John Doe',
    text: 'Thanks, will do.',
    date: '2025-02-10T16:00:00Z',
    parentId: 'c1',
  },
];
