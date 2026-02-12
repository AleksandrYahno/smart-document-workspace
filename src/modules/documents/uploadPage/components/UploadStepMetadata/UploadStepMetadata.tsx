import { FC, ReactElement } from 'react';

import { Button } from '@shared/uiKit/button';
import { Input } from '@shared/uiKit/input';

import { CATEGORY_OPTIONS, ACCESS_LEVEL_OPTIONS } from './UploadStepMetadata.config';
import type { IUploadStepMetadataProps } from './UploadStepMetadata.interface';

import styles from '../../uploadPage.module.scss';

const UploadStepMetadata: FC<IUploadStepMetadataProps> = (props): ReactElement => {
  const { values, errors, setFieldValue, onBack, onNext, t } = props;

  return (
    <div className={styles.formCard}>
      <div className={styles.field}>
        <Input
          name="title"
          label={t('upload_field_title')}
          value={values.title}
          onChange={(e) => setFieldValue('title', e.target.value)}
          error={errors.title}
          fullWidth
        />
      </div>

      <div className={styles.field}>
        <Input
          name="description"
          label={t('upload_field_description')}
          value={values.description}
          onChange={(e) => setFieldValue('description', e.target.value)}
          error={errors.description}
          fullWidth
        />
      </div>

      <div className={styles.field}>
        <Input
          name="tags"
          label={t('upload_field_tags')}
          value={values.tags}
          onChange={(e) => setFieldValue('tags', e.target.value)}
          error={errors.tags}
          fullWidth
        />
      </div>

      <div className={styles.field}>
        <label className={styles.selectLabel}>
          {t('upload_field_category')}
        </label>
        <select
          className={styles.select}
          value={values.category}
          onChange={(e) => setFieldValue('category', e.target.value)}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option
              key={opt.value || 'empty'}
              value={opt.value}
            >
              {opt.value ? t(`upload_category_${opt.value}`) : opt.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className={styles.errorText}>
            {errors.category}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.selectLabel}>
          {t('upload_field_access')}
        </label>
        <select
          className={styles.select}
          value={values.accessLevel}
          onChange={(e) => setFieldValue('accessLevel', e.target.value)}
        >
          {ACCESS_LEVEL_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {t(`upload_access_${opt.value}`)}
            </option>
          ))}
        </select>
        {errors.accessLevel && (
          <span className={styles.errorText}>
            {errors.accessLevel}
          </span>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('back', { ns: 'common' })}
        </Button>

        <Button
          type="button"
          variant="primary"
          onClick={onNext}
        >
          {t('next', { ns: 'common' })}
        </Button>
      </div>
    </div>
  );
};

export default UploadStepMetadata;
