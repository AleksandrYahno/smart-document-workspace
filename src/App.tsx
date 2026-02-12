import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

import styles from './App.module.scss';

const App: FC = (): ReactElement => {
  const { t } = useTranslation(['common', 'documents']);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link
            to="/documents"
            className={styles.headerLink}
          >
            {t('common:app_title')}
          </Link>
          <Link
            to="/analytics"
            className={styles.headerLink}
          >
            {t('documents:analytics_title')}
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
