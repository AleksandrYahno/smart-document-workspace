export const CATEGORY_OPTIONS = [
  { value: '', label: '—' },
  { value: 'contracts', label: 'Contracts' },
  { value: 'reports', label: 'Reports' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
] as const;

export const ACCESS_LEVEL_OPTIONS = [
  { value: 'view', label: 'View' },
  { value: 'edit', label: 'Edit' },
  { value: 'admin', label: 'Admin' },
] as const;
