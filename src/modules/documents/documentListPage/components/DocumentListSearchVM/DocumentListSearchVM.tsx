import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@shared/uiKit/button';
import { Input } from '@shared/uiKit/input';

import useDocumentListStoreProvider from '../../providers/documentListStoreProvider/useDocumentListStoreProvider';

import styles from '../../documentListPage.module.scss';

const DocumentListSearchVM: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const { documentListStore } = useDocumentListStoreProvider();

  const searchInput = documentListStore((s) => s.documentListSlice.searchInput);
  const setSearchInput = documentListStore((s) => s.documentListSlice.setSearchInput);
  const submitSearch = documentListStore((s) => s.documentListSlice.submitSearch);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    submitSearch();
  };

  return (
    <form
      className={styles.searchForm}
      onSubmit={handleSubmit}
    >
      <Input
        placeholder={t('search', { ns: 'common' })}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={styles.searchInput}
      />

      <Button type="submit">
        {t('search', { ns: 'common' })}
      </Button>
    </form>
  );
};

export default DocumentListSearchVM;
