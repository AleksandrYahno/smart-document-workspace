import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/uiKit/button';
import { formatDate } from '@helpers/formatDate.helper';

import { useDocumentDetailComments } from './useDocumentDetailComments';

import styles from './documentDetailComments.module.scss';

const DocumentDetailComments: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const {
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
  } = useDocumentDetailComments();

  return (
    <div className={styles.root}>
      <div className={styles.addRow}>
        <textarea
          className={styles.textarea}
          value={newCommentText}
          onChange={handleNewCommentChange}
          placeholder={t('detail_comments_placeholder')}
          rows={3}
          aria-label={t('detail_comments_placeholder')}
        />
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleAddComment}
          disabled={!newCommentText.trim()}
        >
          {t('detail_comments_add')}
        </Button>
      </div>

      <ul className={styles.list}>
        {topLevel.map((comment) => (
          <li
            key={comment.id}
            className={styles.commentItem}
          >
            <div className={styles.commentCard}>
              <p className={styles.commentMeta}>
                <span className={styles.commentAuthor}>
                  {comment.author}
                </span>
                <span className={styles.commentDate}>
                  {formatDate(comment.date)}
                </span>
              </p>
              <p className={styles.commentText}>
                {comment.text}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={styles.replyBtn}
                data-comment-id={comment.id}
                onClick={handleReplyClick}
              >
                {t('detail_comments_reply')}
              </Button>
            </div>

            {getReplies(comment.id).length > 0 && (
              <ul className={styles.repliesList}>
                {getReplies(comment.id).map((reply) => (
                  <li
                    key={reply.id}
                    className={styles.replyItem}
                  >
                    <p className={styles.commentMeta}>
                      <span className={styles.commentAuthor}>
                        {reply.author}
                      </span>
                      <span className={styles.commentDate}>
                        {formatDate(reply.date)}
                      </span>
                    </p>
                    <p className={styles.commentText}>
                      {reply.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {replyingToId === comment.id && (
              <div className={styles.replyForm}>
                <textarea
                  className={styles.textarea}
                  value={replyText}
                  onChange={handleReplyTextChange}
                  placeholder={t('detail_comments_reply_placeholder')}
                  rows={2}
                  autoFocus
                  aria-label={t('detail_comments_reply_placeholder')}
                />
                <div className={styles.replyActions}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCancelReply}
                  >
                    {t('cancel', { ns: 'common' })}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleSubmitReply}
                    disabled={!replyText.trim()}
                  >
                    {t('detail_comments_reply')}
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentDetailComments;
