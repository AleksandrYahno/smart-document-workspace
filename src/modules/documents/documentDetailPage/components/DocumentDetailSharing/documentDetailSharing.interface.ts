export type TSharingPermission = 'view' | 'edit' | 'admin';

export interface ISharedUser {
  id: string;
  email: string;
  permission: TSharingPermission;
}

import type { ChangeEvent, MouseEvent } from 'react';

export interface IDocumentDetailSharingProps {
  documentId: string;
}

export interface IUseDocumentDetailSharingReturn {
  sharedUsers: ISharedUser[];
  emailInput: string;
  permissionInput: TSharingPermission;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePermissionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAddUser: () => void;
  handleRemoveUser: (e: MouseEvent<HTMLButtonElement>) => void;
  handlePermissionChangeForUser: (userId: string, permission: TSharingPermission) => void;
  canAdd: boolean;
}
