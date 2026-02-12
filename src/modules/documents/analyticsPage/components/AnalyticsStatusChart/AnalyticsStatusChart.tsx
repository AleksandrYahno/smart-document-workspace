import { FC, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import type { IAnalyticsStatusChartProps } from './AnalyticsStatusChart.interface';

import styles from './analyticsStatusChart.module.scss';

const COLORS = ['#6e6e73', '#ff9500', '#34c759'];

const AnalyticsStatusChart: FC<IAnalyticsStatusChartProps> = (props): ReactElement => {
  const { data } = props;
  const { t } = useTranslation('documents');

  const chartData = data.map((item) => ({
    name: t(`status_${item.status}`),
    value: item.count,
  }));

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {t('analytics_status_title')}
      </h3>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${percent != null ? (percent * 100).toFixed(0) : 0}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsStatusChart;
