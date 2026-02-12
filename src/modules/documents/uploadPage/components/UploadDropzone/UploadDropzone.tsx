import { FC, ReactElement } from 'react';
import { useDropzone } from 'react-dropzone';

import { formatBytes } from '@helpers/formatBytes.helper';

import { MAX_FILE_SIZE_BYTES } from '../../uploadForm.interface';

import { DROPZONE_ACCEPT, DROPZONE_MAX_FILES } from './UploadDropzone.config';
import type { IUploadDropzoneProps } from './UploadDropzone.interface';

import styles from '../../uploadPage.module.scss';

const UploadDropzone: FC<IUploadDropzoneProps> = ({ file, error, onFile, t }): ReactElement => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: DROPZONE_MAX_FILES,
    maxSize: MAX_FILE_SIZE_BYTES,
    accept: DROPZONE_ACCEPT,
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
        {t('upload_file_types')}
        .
        {t('upload_max_size')}
        .
      </p>
      {file && (
        <p className={styles.fileName}>
          {file.name}
          {' '}
          (
          {formatBytes(file.size)}
          )
        </p>
      )}
      {error && (
        <p className={styles.dropzoneError}>
          {error}
        </p>
      )}
    </div>
  );
};

export default UploadDropzone;
