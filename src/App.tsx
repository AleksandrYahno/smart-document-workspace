import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import styles from './App.module.scss';

const App: FC = (): ReactElement => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link
          to="/documents"
          className={styles.headerLink}
        >
          {t('app_title')}
        </Link>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
