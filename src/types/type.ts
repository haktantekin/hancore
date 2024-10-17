export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'color' | 'gradient';
export type LoaderPosition = 'left' | 'center' | 'right';

type HanSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type HanColor = 
  | 'blue'
  | 'green'
  | 'red'
  | string & { __brand: 'other' };

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

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'baseline' | 'stretch';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: string | number;
  style?: React.CSSProperties;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: number;
  gap?: string | number;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  span?: number;
  offset?: number;
}

type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

interface Breakpoint {
  maxWidth: number;
  cols: number;
}

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: number;
  spacing?: SpacingValue;
  verticalSpacing?: SpacingValue;
  breakpoints?: Breakpoint[];
}


export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
  size?: HanSize;
  radius?: HanSize | 'full';
  color?: HanColor;
  labelPosition?: 'left' | 'right';
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  required?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
}

export interface ChipProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  id?: string;
  size?: HanSize;
  radius?: HanSize | 'xl';
  color?: HanColor;
  variant?: 'outline' | 'filled' | 'light';
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  required?: boolean;
  name?: string;
  value?: string;
  form?: string;
  type?: 'checkbox' | 'radio';
}

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  size?: HanSize;
  radius?: HanSize;
  variant?: 'default' | 'filled' | 'unstyled';
  withAsterisk?: boolean;
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  icon?: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
  inputContainer?: (children: React.ReactNode) => React.ReactNode;
  rightSectionWidth?: number | string;
  leftSectionWidth?: number | string;
}

export type ColorFormat = 'hex' | 'rgba' | 'rgb' | 'hsl' | 'hsla';
export type ColorPickerColor = string;

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'> {
  value?: ColorPickerColor;
  onChange?: (color: ColorPickerColor) => void;
  format?: ColorFormat;
  swatches?: ColorPickerColor[];
  withPicker?: boolean;
  fullWidth?: boolean;
  size?: HanSize;
  focusable?: boolean;
  swatchesPerRow?: number;
  onChangeEnd?: (color: ColorPickerColor) => void;
  disabled?: boolean;
}

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: React.ReactNode;
  legend?: React.ReactNode;
  variant?: 'default' | 'filled' | 'unstyled';
  disabled?: boolean;
  radius?: HanSize;
  unstyled?: boolean;
  withAsterisk?: boolean;
}

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right' | 'apart';
  noWrap?: boolean;
  grow?: boolean;
  spacing?: HanSize;
  align?: 'stretch' | 'center' | 'start' | 'end';
  preventGrowOverflow?: boolean;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: React.CSSProperties['justifyContent'];
  gap?: React.CSSProperties['gap'];
}

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  withAsterisk?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  iconWidth?: number | string;
  disabled?: boolean;
  radius?: HanSize;
  size?: HanSize;
  variant?: 'default' | 'filled' | 'unstyled';
  value?: File | File[] | null;
  onChange?: (value: File | File[] | null) => void;
  valueComponent?: React.FC<{ value: File | File[] | null }>;
  clearButtonLabel?: string;
  readOnly?: boolean;
  capture?: boolean | 'user' | 'environment';
  fileInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
}