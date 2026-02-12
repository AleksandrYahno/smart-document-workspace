import { FC, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikErrors } from 'formik';
import { useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';

import { Button } from '@shared/uiKit/button';
import { Input } from '@shared/uiKit/input';
import { formatBytes } from '@helpers/formatBytes.helper';

import {
  IUploadFormValues,
  CATEGORY_OPTIONS,
  ACCESS_LEVEL_OPTIONS,
  MAX_FILE_SIZE_BYTES,
} from './uploadForm.interface';
import { step1Schema, step2Schema } from './uploadValidation.schema';

import styles from './uploadPage.module.scss';

const INITIAL_VALUES: IUploadFormValues = {
  file: null,
  title: '',
  description: '',
  tags: '',
  category: '',
  accessLevel: 'view',
};

const STEPS = [1, 2, 3] as const;

const UploadPage: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [step, setStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep1 = async (values: IUploadFormValues): Promise<FormikErrors<IUploadFormValues>> => {
    try {
      await step1Schema.validate(values, { abortEarly: false });

      return {};
    } catch (err) {
      const e = err as { inner?: { path?: string; message?: string }[] };
      const errors: FormikErrors<IUploadFormValues> = {};

      (e.inner ?? []).forEach((item) => {
        if (item.path && item.message) {
          (errors as Record<string, string>)[item.path] = t(item.message);
        }
      });

      return errors;
    }
  };

  const validateStep2 = async (values: IUploadFormValues): Promise<FormikErrors<IUploadFormValues>> => {
    try {
      await step2Schema.validate(values, { abortEarly: false });

      return {};
    } catch (err) {
      const e = err as { inner?: { path?: string; message?: string }[] };
      const errors: FormikErrors<IUploadFormValues> = {};

      (e.inner ?? []).forEach((item) => {
        if (item.path && item.message) {
          (errors as Record<string, string>)[item.path] = t(item.message);
        }
      });

      return errors;
    }
  };

  const handleSubmit = async (_values: IUploadFormValues): Promise<void> => {
    setIsSubmitting(true);
    setUploadProgress(0);

    const duration = 1500;
    const interval = 50;
    const stepProgress = (interval / duration) * 100;
    let progress = 0;

    const timer = setInterval(() => {
      progress += stepProgress;

      if (progress >= 100) {
        clearInterval(timer);
        setUploadProgress(100);
        setIsSubmitting(false);
        enqueueSnackbar(t('upload_success'), { variant: 'success' });
        navigate('/documents');
      } else {
        setUploadProgress(Math.min(progress, 99));
      }
    }, interval);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {t('upload_title')}
      </h1>

      <div className={styles.steps}>
        {STEPS.map((s) => (
          <div
            key={s}
            className={`${styles.step} ${step === s ? styles.active : ''} ${step > s ? styles.done : ''}`}
          >
            {s === 1 && t('upload_step_file')}
            {s === 2 && t('upload_step_metadata')}
            {s === 3 && t('upload_step_review')}
          </div>
        ))}
      </div>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue, setFieldError, errors, setErrors }) => {
          const handleStep1Next = async (): Promise<void> => {
            const errs = await validateStep1(values);

            if (Object.keys(errs).length > 0) {
              setErrors(errs);
            } else {
              setStep(2);
            }
          };

          const handleStep2Next = async (): Promise<void> => {
            const errs = await validateStep2(values);

            if (Object.keys(errs).length > 0) {
              setErrors(errs);
            } else {
              setStep(3);
            }
          };

          return (
          <Form>
            {step === 1 && (
              <div className={styles.formCard}>
                <Step1Dropzone
                  file={values.file}
                  error={errors.file}
                  onFile={(file) => {
                    setFieldValue('file', file);
                    setFieldError('file', undefined);
                  }}
                  t={t}
                />
                <div className={styles.actions}>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => handleStep1Next()}
                  >
                    {t('next', { ns: 'common' })}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
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
                    onClick={() => setStep(1)}
                  >
                    {t('back', { ns: 'common' })}
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => handleStep2Next()}
                  >
                    {t('next', { ns: 'common' })}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
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

                {isSubmitting && (
                  <div className={styles.progressWrap}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className={styles.progressLabel}>
                      Uploading… {Math.round(uploadProgress)}%
                    </div>
                  </div>
                )}

                <div className={styles.actions}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
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
            )}
          </Form>
          );
        }}
      </Formik>
    </div>
  );
};

interface IStep1DropzoneProps {
  file: File | null;
  error?: string;
  onFile: (file: File | null) => void;
  t: (key: string) => string;
}

const Step1Dropzone: FC<IStep1DropzoneProps> = ({ file, error, onFile, t }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE_BYTES,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp'],
    },
    onDrop: (accepted) => {
      onFile(accepted[0] ?? null);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${error ? styles.error : ''}`}
    >
      <input {...getInputProps()} />
      <p className={styles.dropzoneText}>
        {t('upload_drop')}
      </p>
      <p className={styles.dropzoneHint}>
        {t('upload_file_types')}. {t('upload_max_size')}.
      </p>
      {file && (
        <p className={styles.fileName}>
          {file.name} ({formatBytes(file.size)})
        </p>
      )}
      {error && (
        <p className={styles.dropzoneHint} style={{ color: '#dc2626', marginTop: '0.5rem' }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default UploadPage;
