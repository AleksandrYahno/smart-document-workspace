import { FC, ReactElement, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/uiKit/button';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';

import type { IDocumentListToolbarVMProps } from './DocumentListToolbarVM.interface';

import styles from '../../documentListPage.module.scss';

const DocumentListToolbarVM: FC<IDocumentListToolbarVMProps> = ({ table }): ReactElement => {
  const { t } = useTranslation('documents');
  const { documentListStore } = useDocumentListStoreProvider();
  const columnsDropdownRef = useRef<HTMLDivElement>(null);

  const viewMode = documentListStore((s) => s.documentListSlice.viewMode);
  const setViewMode = documentListStore((s) => s.documentListSlice.setViewMode);
  const columnsOpen = documentListStore((s) => s.documentListSlice.columnsOpen);
  const setColumnsOpen = documentListStore((s) => s.documentListSlice.setColumnsOpen);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (columnsDropdownRef.current && !columnsDropdownRef.current.contains(e.target as Node)) {
        setColumnsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setColumnsOpen]);

  return (
    <>
      <div className={styles.viewToggle}>
        <Button
          size="sm"
          variant={viewMode === 'table' ? 'primary' : 'outline'}
          onClick={() => setViewMode('table')}
        >
          {t('view_table')}
        </Button>

        <Button
          size="sm"
          variant={viewMode === 'grid' ? 'primary' : 'outline'}
          onClick={() => setViewMode('grid')}
        >
          {t('view_grid')}
        </Button>
      </div>

      <div
        className={styles.columnsDropdown}
        ref={columnsDropdownRef}
      >
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setColumnsOpen((v) => !v)}
        >
          {t('columns')}
        </Button>

        {
          columnsOpen && (
            <div className={styles.columnsPanel}>
              {table.getAllLeafColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <label
                    key={col.id}
                    className={styles.columnCheckbox}
                  >
                    <input
                      type="checkbox"
                      checked={col.getIsVisible()}
                      onChange={col.getToggleVisibilityHandler()}
                    />
                    {t(col.id === 'lastModified' ? 'last_modified' : col.id)}
                  </label>
                ))}
            </div>
          )
        }
      </div>
    </>
  );
};

export default DocumentListToolbarVM;
