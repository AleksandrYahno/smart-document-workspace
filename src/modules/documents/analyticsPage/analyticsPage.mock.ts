import type {
  IStorageByTypeData,
  IUploadActivityData,
  IStatusDistributionData,
} from './analyticsPage.config';

export const getMockStorageByType = (): IStorageByTypeData[] => [
  { type: 'PDF', bytes: 15_000_000 },
  { type: 'DOCX', bytes: 8_500_000 },
  { type: 'image', bytes: 22_000_000 },
];

export const getMockUploadActivity = (startDate: Date, endDate: Date): IUploadActivityData[] => {
  const days: IUploadActivityData[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    days.push({
      date: current.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10) + 1,
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
};

export const getMockStatusDistribution = (): IStatusDistributionData[] => [
  { status: 'draft', count: 12 },
  { status: 'review', count: 8 },
  { status: 'approved', count: 25 },
];
