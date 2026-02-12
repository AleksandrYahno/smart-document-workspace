import { ButtonHTMLAttributes, ReactNode } from 'react';

export type TButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type TButtonSize = 'sm' | 'md' | 'lg';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  fullWidth?: boolean;
}
