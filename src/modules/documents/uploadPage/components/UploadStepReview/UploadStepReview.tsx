import { FC, ReactElement } from 'react';

import { Button } from '@shared/uiKit/button';
import { formatBytes } from '@helpers/formatBytes.helper';

import type { IUploadStepReviewProps } from './UploadStepReview.interface';

import styles from '../../uploadPage.module.scss';

const UploadStepReview: FC<IUploadStepReviewProps> = (props): ReactElement => {
  const { values, isSubmitting, uploadProgress, onBack, t } = props;

  return (
    <div className={styles.formCard}>
      <dl>
        <div className={styles.reviewRow}>
          <dt>{t('upload_field_title')}</dt>
          <dd>{values.title || '—'}</dd>
        </div>

        <div className={styles.reviewRow}>
          <dt>{t('upload_field_description')}</dt>
          <dd>{values.description || '—'}</dd>
        </div>

        <div className={styles.reviewRow}>
          <dt>{t('upload_field_tags')}</dt>
          <dd>{values.tags || '—'}</dd>
        </div>

        <div className={styles.reviewRow}>
          <dt>{t('upload_field_category')}</dt>
          <dd>{values.category ? t(`upload_category_${values.category}`) : '—'}</dd>
        </div>

        <div className={styles.reviewRow}>
          <dt>{t('upload_field_access')}</dt>
          <dd>{t(`upload_access_${values.accessLevel}`)}</dd>
        </div>

        <div className={styles.reviewRow}>
          <dt>File</dt>
          <dd>
            {values.file
              ? `${values.file.name} (${formatBytes(values.file.size)})`
              : '—'}
          </dd>
        </div>
      </dl>

      {
        isSubmitting && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                data-progress={Math.round(uploadProgress)}
              />
            </div>
            <div className={styles.progressLabel}>
              Uploading… {Math.round(uploadProgress)}%
            </div>
          </div>
        )
      }

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {t('back', { ns: 'common' })}
        </Button>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {t('upload_review_submit')}
        </Button>
      </div>
    </div>
  );
};

export default UploadStepReview;
