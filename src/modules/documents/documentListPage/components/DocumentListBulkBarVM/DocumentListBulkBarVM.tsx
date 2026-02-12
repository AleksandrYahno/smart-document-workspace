import { FC, ReactElement, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { Button } from '@shared/uiKit/button';
import { Modal } from '@shared/uiKit/modal';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';

import type { IDocumentListBulkBarVMProps } from './DocumentListBulkBarVM.interface';

import styles from '../../documentListPage.module.scss';

const STATUS_OPTIONS = ['draft', 'review', 'approved'] as const;

const DocumentListBulkBarVM: FC<IDocumentListBulkBarVMProps> = ({ selectedCount }): ReactElement | null => {
  const { t } = useTranslation(['documents', 'common']);
  const { enqueueSnackbar } = useSnackbar();
  const { documentListStore } = useDocumentListStoreProvider();
  const clearRowSelection = documentListStore((s) => s.documentListSlice.clearRowSelection);

  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('draft');

  const handleBulkDelete = useCallback((): void => {
    enqueueSnackbar(t('documents:bulk_delete_success', { count: selectedCount }), { variant: 'success' });
    clearRowSelection();
  }, [enqueueSnackbar, t, selectedCount, clearRowSelection]);

  const handleBulkExport = useCallback((): void => {
    enqueueSnackbar(t('documents:bulk_export_success', { count: selectedCount }), { variant: 'success' });
    clearRowSelection();
  }, [enqueueSnackbar, t, selectedCount, clearRowSelection]);

  const openChangeStatusModal = useCallback((): void => {
    setSelectedStatus('draft');
    setChangeStatusModalOpen(true);
  }, []);

  const closeChangeStatusModal = useCallback((): void => {
    setChangeStatusModalOpen(false);
  }, []);

  const handleBulkChangeStatusConfirm = useCallback((): void => {
    enqueueSnackbar(t('documents:bulk_change_status_success', { count: selectedCount }), { variant: 'success' });
    clearRowSelection();
    closeChangeStatusModal();
  }, [enqueueSnackbar, t, selectedCount, clearRowSelection, closeChangeStatusModal]);

  if (selectedCount <= 0) {
    return null;
  }

  return (
    <>
      <div className={styles.bulkBar}>
        <span className={styles.bulkLabel}>
          {t('documents:selected_count', { count: selectedCount })}
        </span>

        <Button
          size="sm"
          variant="outline"
          onClick={handleBulkDelete}
        >
          {t('documents:bulk_delete')}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={openChangeStatusModal}
        >
          {t('documents:bulk_change_status')}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={handleBulkExport}
        >
          {t('documents:bulk_export')}
        </Button>
      </div>

      <Modal
        isOpen={changeStatusModalOpen}
        onClose={closeChangeStatusModal}
        title={t('documents:bulk_change_status_modal_title')}
      >
        <div className={styles.bulkModalContent}>
          <label className={styles.bulkModalLabel}>
            {t('documents:status')}
          </label>
          <select
            className={styles.bulkModalSelect}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {STATUS_OPTIONS.map((value) => (
              <option
                key={value}
                value={value}
              >
                {t(`documents:status_${value}`)}
              </option>
            ))}
          </select>
          <div className={styles.bulkModalActions}>
            <Button
              size="sm"
              variant="outline"
              onClick={closeChangeStatusModal}
            >
              {t('common:cancel')}
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleBulkChangeStatusConfirm}
            >
              {t('common:confirm')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocumentListBulkBarVM;
