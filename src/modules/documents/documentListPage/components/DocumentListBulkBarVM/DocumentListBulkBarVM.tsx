import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/uiKit/button';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';

import type { IDocumentListBulkBarVMProps } from './DocumentListBulkBarVM.interface';

import styles from '../../documentListPage.module.scss';

const DocumentListBulkBarVM: FC<IDocumentListBulkBarVMProps> = ({ selectedCount }): ReactElement | null => {
  const { t } = useTranslation('documents');
  const { documentListStore } = useDocumentListStoreProvider();
  const clearRowSelection = documentListStore((s) => s.documentListSlice.clearRowSelection);

  const handleBulkDelete = (): void => {
    clearRowSelection();
  };

  const handleBulkExport = (): void => {
    clearRowSelection();
  };

  const handleBulkChangeStatus = (): void => {
    clearRowSelection();
  };

  if (selectedCount <= 0) {
    return null;
  }

  return (
    <div className={styles.bulkBar}>
      <span className={styles.bulkLabel}>
        {t('selected_count', { count: selectedCount })}
      </span>

      <Button
        size="sm"
        variant="outline"
        onClick={handleBulkDelete}
      >
        {t('bulk_delete')}
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={handleBulkChangeStatus}
      >
        {t('bulk_change_status')}
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={handleBulkExport}
      >
        {t('bulk_export')}
      </Button>
    </div>
  );
};

export default DocumentListBulkBarVM;
