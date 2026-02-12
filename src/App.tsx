import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

const App: FC = (): ReactElement => {
  const { t } = useTranslation('common');

  return (
    <div>
      <header style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
        <Link
          to="/documents"
          style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}
        >
          {t('app_title')}
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
