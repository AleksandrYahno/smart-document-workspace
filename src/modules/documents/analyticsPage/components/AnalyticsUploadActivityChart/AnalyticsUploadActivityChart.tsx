import { FC, ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import type { IAnalyticsUploadActivityChartProps } from './AnalyticsUploadActivityChart.interface';

import styles from './analyticsUploadActivityChart.module.scss';

const AnalyticsUploadActivityChart: FC<IAnalyticsUploadActivityChartProps> = (props): ReactElement => {
  const { data } = props;
  const { t } = useTranslation('documents');

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: item.count,
      })),
    [data],
  );

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {t('analytics_upload_activity_title')}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#0071e3"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsUploadActivityChart;
