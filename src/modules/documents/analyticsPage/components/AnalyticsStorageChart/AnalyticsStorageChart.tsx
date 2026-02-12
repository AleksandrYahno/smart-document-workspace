import { FC, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { formatBytes } from '@helpers/formatBytes.helper';

import type { IAnalyticsStorageChartProps } from './AnalyticsStorageChart.interface';

import styles from './analyticsStorageChart.module.scss';

const AnalyticsStorageChart: FC<IAnalyticsStorageChartProps> = (props): ReactElement => {
  const { data } = props;
  const { t } = useTranslation('documents');

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        type: item.type,
        bytes: item.bytes,
        label: formatBytes(item.bytes),
      })),
    [data],
  );

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {t('analytics_storage_title')}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis tickFormatter={(value: unknown) => formatBytes(value as number)} />
          <Tooltip formatter={(value: number | undefined) => (value != null ? formatBytes(value) : '')} />
          <Bar
            dataKey="bytes"
            fill="#0071e3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsStorageChart;
