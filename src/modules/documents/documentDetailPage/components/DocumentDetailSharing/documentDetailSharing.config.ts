import type { ISharedUser, TSharingPermission } from './documentDetailSharing.interface';

export const SHARING_PERMISSION_OPTIONS: { value: TSharingPermission; i18nKey: string }[] = [
  { value: 'view', i18nKey: 'upload_access_view' },
  { value: 'edit', i18nKey: 'upload_access_edit' },
  { value: 'admin', i18nKey: 'upload_access_admin' },
];

const MOCK_SHARED: Record<string, ISharedUser[]> = {
  '1': [
    { id: 's1', email: 'jane@example.com', permission: 'edit' },
    { id: 's2', email: 'bob@example.com', permission: 'view' },
  ],
  '2': [
    { id: 's3', email: 'john@example.com', permission: 'view' },
  ],
};

export const getInitialSharedUsers = (documentId: string): ISharedUser[] =>
  MOCK_SHARED[documentId] ?? [];
