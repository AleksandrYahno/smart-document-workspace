import { FC, ReactElement } from 'react';

import { Button } from '@shared/uiKit/button';

import UploadDropzone from '../UploadDropzone/UploadDropzone';

import type { IUploadStepFileProps } from './UploadStepFile.interface';

import styles from '../../uploadPage.module.scss';

const UploadStepFile: FC<IUploadStepFileProps> = (props): ReactElement => {
  const { values, errors, setFieldValue, setFieldError, onNext, t } = props;

  return (
    <div className={styles.formCard}>
      <UploadDropzone
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
          onClick={onNext}
        >
          {t('next', { ns: 'common' })}
        </Button>
      </div>
    </div>
  );
};

export default UploadStepFile;
