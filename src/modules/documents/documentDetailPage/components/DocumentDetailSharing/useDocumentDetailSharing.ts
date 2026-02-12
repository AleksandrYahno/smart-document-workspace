import { useState, useCallback, useMemo, type ChangeEvent, type MouseEvent } from 'react';

import type {
  ISharedUser,
  TSharingPermission,
  IUseDocumentDetailSharingReturn,
} from './documentDetailSharing.interface';
import { getInitialSharedUsers } from './documentDetailSharing.config';

const generateSharedUserId = (): string =>
  `shared-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useDocumentDetailSharing = (documentId: string): IUseDocumentDetailSharingReturn => {
  const [sharedUsers, setSharedUsers] = useState<ISharedUser[]>(() =>
    getInitialSharedUsers(documentId),
  );
  const [emailInput, setEmailInput] = useState('');
  const [permissionInput, setPermissionInput] = useState<TSharingPermission>('view');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEmailInput(e.target.value);
  }, []);

  const handlePermissionChange = useCallback((e: ChangeEvent<HTMLSelectElement>): void => {
    setPermissionInput(e.target.value as TSharingPermission);
  }, []);

  const handleAddUser = useCallback((): void => {
    const email = emailInput.trim().toLowerCase();

    if (!email) return;

    const exists = sharedUsers.some((u) => u.email === email);

    if (exists) return;

    setSharedUsers((prev) => [
      ...prev,
      {
        id: generateSharedUserId(),
        email,
        permission: permissionInput,
      },
    ]);
    setEmailInput('');
  }, [emailInput, permissionInput, sharedUsers]);

  const handleRemoveUser = useCallback((e: MouseEvent<HTMLButtonElement>): void => {
    const id = (e.currentTarget as HTMLButtonElement).dataset.userId;

    if (id) {
      setSharedUsers((prev) => prev.filter((u) => u.id !== id));
    }
  }, []);

  const handlePermissionChangeForUser = useCallback((userId: string, permission: TSharingPermission): void => {
    setSharedUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, permission } : u)),
    );
  }, []);

  const canAdd = useMemo(() => emailInput.trim().length > 0, [emailInput]);

  return {
    sharedUsers,
    emailInput,
    permissionInput,
    handleEmailChange,
    handlePermissionChange,
    handleAddUser,
    handleRemoveUser,
    handlePermissionChangeForUser,
    canAdd,
  };
};
