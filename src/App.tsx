import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

const App: FC = (): ReactElement => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>
        {t('app_title')}
      </h1>
    </div>
  );
};

export default App;
