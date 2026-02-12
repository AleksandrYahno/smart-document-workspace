import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FormikErrors } from 'formik';
import { useSnackbar } from 'notistack';

import { IUploadFormValues } from './uploadForm.interface';
import { validateUploadStep } from './uploadValidation';
import { UploadStep, UPLOAD_STEP_ORDER } from './uploadStep.enum';
import { useUploadStoreProvider } from './providers/uploadStoreProvider';
import {
  UPLOAD_PAGE_INITIAL_VALUES,
  UPLOAD_PAGE_STEP_LABEL_KEYS,
  UPLOAD_PROGRESS_DURATION_MS,
  UPLOAD_PROGRESS_INTERVAL_MS,
} from './uploadPage.config';
import UploadStepFile from './components/UploadStepFile/UploadStepFile';
import UploadStepMetadata from './components/UploadStepMetadata/UploadStepMetadata';
import UploadStepReview from './components/UploadStepReview/UploadStepReview';

import styles from './uploadPage.module.scss';

const UploadPage: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { uploadStore } = useUploadStoreProvider();

  const step = uploadStore((s) => s.uploadSlice.step);
  const uploadProgress = uploadStore((s) => s.uploadSlice.uploadProgress);
  const isSubmitting = uploadStore((s) => s.uploadSlice.isSubmitting);
  const setUploadProgress = uploadStore((s) => s.uploadSlice.setUploadProgress);
  const setIsSubmitting = uploadStore((s) => s.uploadSlice.setIsSubmitting);
  const goToNextStep = uploadStore((s) => s.uploadSlice.goToNextStep);
  const goToPrevStep = uploadStore((s) => s.uploadSlice.goToPrevStep);

  const handleSubmit = async (_values: IUploadFormValues): Promise<void> => {
    setIsSubmitting(true);
    setUploadProgress(0);

    const stepProgress = (UPLOAD_PROGRESS_INTERVAL_MS / UPLOAD_PROGRESS_DURATION_MS) * 100;
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
    }, UPLOAD_PROGRESS_INTERVAL_MS);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        {t('upload_title')}
      </h1>

      <div className={styles.steps}>
        {UPLOAD_STEP_ORDER.map((s) => (
          <div
            key={s}
            className={`${styles.step} ${step === s ? styles.active : ''} ${step > s ? styles.done : ''}`}
          >
            {t(UPLOAD_PAGE_STEP_LABEL_KEYS[s])}
          </div>
        ))}
      </div>

      <Formik
        initialValues={UPLOAD_PAGE_INITIAL_VALUES}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ values, setFieldValue, setFieldError, errors, setErrors }) => {
          const handleValidateAndGoNext = async (): Promise<void> => {
            const errs: FormikErrors<IUploadFormValues> = await validateUploadStep(step, values, t);

            if (Object.keys(errs).length > 0) {
              setErrors(errs);
            } else {
              goToNextStep();
            }
          };

          return (
            <Form>
              {step === UploadStep.File && (
                <UploadStepFile
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  onNext={() => void handleValidateAndGoNext()}
                  t={t}
                />
              )}

              {step === UploadStep.Metadata && (
                <UploadStepMetadata
                  values={values}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  onBack={goToPrevStep}
                  onNext={() => void handleValidateAndGoNext()}
                  t={t}
                />
              )}

              {step === UploadStep.Review && (
                <UploadStepReview
                  values={values}
                  isSubmitting={isSubmitting}
                  uploadProgress={uploadProgress}
                  onBack={goToPrevStep}
                  t={t}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UploadPage;
