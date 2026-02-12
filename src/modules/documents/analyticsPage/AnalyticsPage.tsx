import { FC, ReactElement, useState, useMemo, useCallback, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  getMockStorageByType,
  getMockUploadActivity,
  getMockStatusDistribution,
} from './analyticsPage.mock';
import AnalyticsStorageChart from './components/AnalyticsStorageChart/AnalyticsStorageChart';
import AnalyticsUploadActivityChart from './components/AnalyticsUploadActivityChart/AnalyticsUploadActivityChart';
import AnalyticsStatusChart from './components/AnalyticsStatusChart/AnalyticsStatusChart';

import styles from './analyticsPage.module.scss';

const DEFAULT_START_DATE = new Date();
DEFAULT_START_DATE.setDate(DEFAULT_START_DATE.getDate() - 30);

const DEFAULT_END_DATE = new Date();

const AnalyticsPage: FC = (): ReactElement => {
  const { t } = useTranslation('documents');
  const [startDate, setStartDate] = useState<string>(
    DEFAULT_START_DATE.toISOString().split('T')[0],
  );
  const [endDate, setEndDate] = useState<string>(DEFAULT_END_DATE.toISOString().split('T')[0]);

  const handleStartDateChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value);
  }, []);

  const handleEndDateChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value);
  }, []);

  const dateRange = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return { start, end };
  }, [startDate, endDate]);

  const storageData = useMemo(() => getMockStorageByType(), []);
  const uploadActivityData = useMemo(
    () => getMockUploadActivity(dateRange.start, dateRange.end),
    [dateRange],
  );
  const statusData = useMemo(() => getMockStatusDistribution(), []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {t('analytics_title')}
        </h1>
      </header>

      <div className={styles.dateFilter}>
        <label
          className={styles.dateFilterLabel}
          htmlFor="analytics-start-date"
        >
          {t('analytics_date_from')}
        </label>
        <input
          id="analytics-start-date"
          type="date"
          className={styles.dateInput}
          value={startDate}
          onChange={handleStartDateChange}
        />
        <label
          className={styles.dateFilterLabel}
          htmlFor="analytics-end-date"
        >
          {t('analytics_date_to')}
        </label>
        <input
          id="analytics-end-date"
          type="date"
          className={styles.dateInput}
          value={endDate}
          onChange={handleEndDateChange}
        />
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <AnalyticsStorageChart data={storageData} />
        </div>

        <div className={styles.chartCard}>
          <AnalyticsUploadActivityChart data={uploadActivityData} />
        </div>

        <div className={styles.chartCard}>
          <AnalyticsStatusChart data={statusData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
