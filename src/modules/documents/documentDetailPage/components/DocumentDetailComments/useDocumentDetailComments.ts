import {
  useState,
  useCallback,
  useMemo,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import { useTranslation } from 'react-i18next';

import { INITIAL_COMMENTS } from './documentDetailComments.config';
import type { IComment, IUseDocumentDetailCommentsReturn } from './documentDetailComments.interface';

const generateCommentId = (): string =>
  `comment-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useDocumentDetailComments = (): IUseDocumentDetailCommentsReturn => {
  const { t } = useTranslation('documents');

  const [comments, setComments] = useState<IComment[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const topLevel = useMemo(
    () => comments.filter((c) => !c.parentId),
    [comments],
  );

  const getReplies = useCallback(
    (parentId: string): IComment[] =>
      comments.filter((c) => c.parentId === parentId),
    [comments],
  );

  const handleNewCommentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewCommentText(e.target.value);
  }, []);

  const handleReplyTextChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setReplyText(e.target.value);
  }, []);

  const handleAddComment = useCallback((): void => {
    const trimmed = newCommentText.trim();

    if (!trimmed) return;

    setComments((prev) => [
      ...prev,
      {
        id: generateCommentId(),
        author: t('detail_comments_me'),
        text: trimmed,
        date: new Date().toISOString(),
      },
    ]);
    setNewCommentText('');
  }, [newCommentText, t]);

  const handleStartReply = useCallback((id: string): void => {
    setReplyingToId(id);
    setReplyText('');
  }, []);

  const handleCancelReply = useCallback((): void => {
    setReplyingToId(null);
    setReplyText('');
  }, []);

  const handleSubmitReply = useCallback((): void => {
    const trimmed = replyText.trim();

    if (!trimmed || !replyingToId) return;

    setComments((prev) => [
      ...prev,
      {
        id: generateCommentId(),
        author: t('detail_comments_me'),
        text: trimmed,
        date: new Date().toISOString(),
        parentId: replyingToId,
      },
    ]);
    setReplyingToId(null);
    setReplyText('');
  }, [replyText, replyingToId, t]);

  const handleReplyClick = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    const id = (e.currentTarget as HTMLButtonElement).dataset.commentId;

    if (id) {
      handleStartReply(id);
    }
  }, [handleStartReply]);

  return {
    topLevel,
    getReplies,
    newCommentText,
    replyText,
    replyingToId,
    handleNewCommentChange,
    handleReplyTextChange,
    handleAddComment,
    handleReplyClick,
    handleCancelReply,
    handleSubmitReply,
  };
};
