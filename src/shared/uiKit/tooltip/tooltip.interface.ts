import { ReactNode } from 'react';

export type TTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface ITooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TTooltipPosition;
  className?: string;
}
