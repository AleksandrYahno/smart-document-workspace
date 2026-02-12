import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';

const App: FC = (): ReactElement => {
  const { t } = useTranslation('common');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fbfbfd' }}>
      <header
        style={{
          padding: '0.875rem 1.5rem',
          borderBottom: '1px solid #d2d2d7',
          backgroundColor: '#ffffff',
        }}
      >
        <Link
          to="/documents"
          style={{
            fontWeight: 600,
            color: '#1d1d1f',
            textDecoration: 'none',
            fontSize: '1.125rem',
          }}
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
