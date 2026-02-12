import { ReactNode } from 'react';

export type TBadgeVariant = 'default' | 'success' | 'warning' | 'error';

export interface IBadgeProps {
  children: ReactNode;
  variant?: TBadgeVariant;
  className?: string;
}
