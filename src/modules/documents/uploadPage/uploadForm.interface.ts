export interface IUploadFormValues {
  file: File | null;
  title: string;
  description: string;
  tags: string;
  category: string;
  accessLevel: string;
}

export const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
};

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const CATEGORY_OPTIONS = [
  { value: '', label: '—' },
  { value: 'contracts', label: 'Contracts' },
  { value: 'reports', label: 'Reports' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

export const ACCESS_LEVEL_OPTIONS = [
  { value: 'view', label: 'View' },
  { value: 'edit', label: 'Edit' },
  { value: 'admin', label: 'Admin' },
];
