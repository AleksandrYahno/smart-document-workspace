export type TSharingPermission = 'view' | 'edit' | 'admin';

export interface ISharedUser {
  id: string;
  email: string;
  permission: TSharingPermission;
}

export interface IDocumentDetailSharingProps {
  documentId: string;
}
