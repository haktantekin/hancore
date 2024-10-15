export type ButtonSize = 'small' | 'medium' | 'large';

export interface Gradient {
  from: string;
  to: string;
  deg?: number;  // Derece (opsiyonel)
}

export interface LoaderProps {
  size?: number;
  color?: string;
}

export type Variants = 'color' | 'gradient';

export interface ButtonProps {
  size?: ButtonSize;
  type?: 'submit' | 'button' | 'reset';
  textColor?: string;
  bgColor?:string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  radius?: number;
  variant?: Variants;
  gradient?: Gradient;
  className?: string,
  uppercase?: boolean;
  loading?: boolean;
  loaderProps?: LoaderProps;
  loaderPosition?: 'left' | 'right' | 'center';
  children?: React.ReactNode;
  disabled?: boolean;
}
