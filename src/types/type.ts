export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'color' | 'gradient';
export type LoaderPosition = 'left' | 'center' | 'right';

export interface GradientProps {
  from: string;
  to: string;
  deg?: number;
}

export interface LoaderProps {
  size?: number;
  color?: string;
}

export interface ButtonProps {
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  textColor?: string;
  bgColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  radius?: number;
  variant?: ButtonVariant;
  gradient?: GradientProps;
  uppercase?: boolean;
  loading?: boolean;
  loaderProps?: LoaderProps;
  loaderPosition?: LoaderPosition;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export interface ContainerProps {
  width?: 'mobile' | 'tablet' | 'desktop' | number;
  className?: string;
  children: React.ReactNode;
}