import { FC, ReactElement, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/uiKit/button';
import { Input } from '@shared/uiKit/input';

import { SHARING_PERMISSION_OPTIONS } from './documentDetailSharing.config';
import type { IDocumentDetailSharingProps, TSharingPermission } from './documentDetailSharing.interface';
import { useDocumentDetailSharing } from './useDocumentDetailSharing';

import styles from './documentDetailSharing.module.scss';

const DocumentDetailSharing: FC<IDocumentDetailSharingProps> = (props): ReactElement => {
  const { documentId } = props;
  const { t } = useTranslation('documents');
  const {
    sharedUsers,
    emailInput,
    permissionInput,
    handleEmailChange,
    handlePermissionChange,
    handleAddUser,
    handleRemoveUser,
    handlePermissionChangeForUser,
    canAdd,
  } = useDocumentDetailSharing(documentId);

  const handleUserPermissionChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      const userId = (e.currentTarget as HTMLSelectElement).dataset.userId;
      const permission = e.target.value as TSharingPermission;

      if (userId) {
        handlePermissionChangeForUser(userId, permission);
      }
    },
    [handlePermissionChangeForUser],
  );

  return (
    <div className={styles.root}>
      <div className={styles.addRow}>
        <Input
          type="email"
          value={emailInput}
          onChange={handleEmailChange}
          placeholder={t('detail_sharing_email_placeholder')}
          fullWidth
          aria-label={t('detail_sharing_email_placeholder')}
        />
        <select
          className={styles.select}
          value={permissionInput}
          onChange={handlePermissionChange}
          aria-label={t('detail_sharing_permission_label')}
        >
          {SHARING_PERMISSION_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {t(opt.i18nKey)}
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={handleAddUser}
          disabled={!canAdd}
        >
          {t('detail_sharing_add')}
        </Button>
      </div>

      <ul className={styles.userList}>
        {sharedUsers.map((user) => (
          <li
            key={user.id}
            className={styles.userItem}
          >
            <span className={styles.userEmail}>
              {user.email}
            </span>
            <select
              className={styles.selectInline}
              value={user.permission}
              onChange={handleUserPermissionChange}
              data-user-id={user.id}
              aria-label={t('detail_sharing_permission_for', { email: user.email })}
            >
              {SHARING_PERMISSION_OPTIONS.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                >
                  {t(opt.i18nKey)}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={styles.removeBtn}
              data-user-id={user.id}
              onClick={handleRemoveUser}
              aria-label={t('detail_sharing_remove', { email: user.email })}
            >
              {t('detail_sharing_remove_short')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentDetailSharing;
