import type { ChangeEvent, MouseEvent } from 'react';

export interface IComment {
  id: string;
  author: string;
  text: string;
  date: string;
  parentId?: string;
}

export interface IUseDocumentDetailCommentsReturn {
  topLevel: IComment[];
  getReplies: (parentId: string) => IComment[];
  newCommentText: string;
  replyText: string;
  replyingToId: string | null;
  handleNewCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleReplyTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddComment: () => void;
  handleReplyClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleCancelReply: () => void;
  handleSubmitReply: () => void;
}
