import type { IUploadFormValues } from '../uploadForm.interface';

export const DEFAULT_ACCESS_LEVEL = 'view' as const;

export const UPLOAD_PAGE_INITIAL_VALUES: IUploadFormValues = {
  file: null,
  title: '',
  description: '',
  tags: '',
  category: '',
  accessLevel: DEFAULT_ACCESS_LEVEL,
};
