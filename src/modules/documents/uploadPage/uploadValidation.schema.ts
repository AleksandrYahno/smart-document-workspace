import * as Yup from 'yup';

import { MAX_FILE_SIZE_BYTES } from './uploadForm.interface';

export const step1Schema = Yup.object().shape({
  file: Yup.mixed()
    .required('upload_validation_file_required')
    .test('fileType', 'upload_validation_file_type', (value) => {
      if (!value || !(value instanceof File)) {
        return false;
      }

      const allowed = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/webp',
      ];

      return allowed.includes(value.type);
    })
    .test('fileSize', 'upload_validation_file_size', (value) => {
      if (!value || !(value instanceof File)) {
        return false;
      }

      return value.size <= MAX_FILE_SIZE_BYTES;
    }),
});

export const step2Schema = Yup.object().shape({
  title: Yup.string().required('upload_validation_title_required').max(200, 'upload_validation_title_max'),
  description: Yup.string().max(1000, 'upload_validation_description_max'),
  tags: Yup.string().max(500, 'upload_validation_tags_max'),
  category: Yup.string().required('upload_validation_category_required'),
  accessLevel: Yup.string().required('upload_validation_access_required'),
});
