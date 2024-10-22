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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'white' | 'default' | 'gradient';
  color?: HanColor;
  size?: HanSize;
  radius?: HanSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  uppercase?: boolean;
  compact?: boolean;
  loading?: boolean;
  loaderProps?: React.ComponentPropsWithoutRef<'div'>;
  loaderPosition?: 'left' | 'right';
  gradient?: { from: string; to: string; deg?: number };
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

export type InputWrapperOrder = 'label' | 'description' | 'input' | 'error';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  invalid?: boolean;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  leftSection?: React.ReactNode;
  leftSectionWidth?: number | string;
  icon?: React.ReactNode;
  iconWidth?: number | string;
  multiline?: boolean;
  withAsterisk?: boolean;
  error?: React.ReactNode;
  description?: React.ReactNode;
  label?: React.ReactNode;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: InputWrapperOrder[];
  inputContainer?: (children: React.ReactNode) => React.ReactNode;
}

interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  data: (string | SelectItem)[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  withAsterisk?: boolean;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  icon?: React.ReactNode;
  iconWidth?: number | string;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
}

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue'> {
  value?: number;
  onChange?: (value: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  defaultValue?: number;
  disabled?: boolean;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  withAsterisk?: boolean;
  hideControls?: boolean;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  icon?: React.ReactNode;
  iconWidth?: number | string;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
  decimalSeparator?: string;
  thousandSeparator?: string;
  formatter?: (value: number | string) => string;
  parser?: (value: string) => number;
  prefix?: string;
  suffix?: string;
}

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  withAsterisk?: boolean;
  visibilityToggleIcon?: React.ReactNode | ((props: { reveal: boolean }) => React.ReactNode) | null;
  visibilityToggleButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  leftSection?: React.ReactNode;
  leftSectionWidth?: number | string;
  icon?: React.ReactNode;
  iconWidth?: number | string;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
  inputContainer?: (children: React.ReactNode) => React.ReactNode;
  visible?: boolean;
  toggleTabIndex?: number;
}

export interface PinInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  length?: number;
  type?: 'text' | 'number' | 'password';
  mask?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  oneTimeCode?: boolean;
  manageFocus?: boolean;
  preserveInputOrder?: boolean;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
  inputMode?: 'text' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  autoFocus?: boolean;
  id?: string;
  name?: string;
  form?: string;
  initialFocusedIndex?: number;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  color?: HanColor;
  size?: HanSize;
  labelPosition?: 'left' | 'right';
  wrapperProps?: React.HTMLAttributes<HTMLLabelElement>;
  inputWrapperOrder?: ('label' | 'description' | 'input' | 'error')[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: HanSize;
  offset?: HanSize;
}

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  size?: HanSize;
  count?: number;
  color?: HanColor;
  defaultValue?: number;
  emptySymbol?: React.ReactNode;
  fullSymbol?: React.ReactNode;
  highlightSelectedOnly?: boolean;
  readOnly?: boolean;
  fractions?: number;
  name?: string;
  form?: string;
  id?: string;
}

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  size?: HanSize;
  radius?: HanSize;
  color?: HanColor;
  offLabel?: React.ReactNode;
  onLabel?: React.ReactNode;
  thumbIcon?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  wrapperProps?: React.HTMLAttributes<HTMLLabelElement>;
  inputWrapperOrder?: ('label' | 'input' | 'description' | 'error')[];
}

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  variant?: 'default' | 'filled' | 'unstyled';
  size?: HanSize;
  radius?: HanSize;
  withAsterisk?: boolean;
  rightSection?: React.ReactNode;
  rightSectionWidth?: number | string;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  inputWrapperOrder?: InputWrapperOrder[];
}

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipColor = 'dark' | 'light';
type TooltipRadius = 'sm' | 'md' | 'lg';


export interface TooltipProps {
  children: React.ReactNode;
  label: React.ReactNode;
  position?: TooltipPosition;
  withArrow?: boolean;
  opened?: boolean;
  disabled?: boolean;
  offset?: number;
  transition?: string;
  transitionDuration?: number;
  multiline?: boolean;
  width?: number | string;
  color?: TooltipColor;
  radius?: TooltipRadius;
  withinPortal?: boolean;
  inline?: boolean;
  closeDelay?: number;
  openDelay?: number;
  zIndex?: number;
  gutter?: number;
  arrowSize?: number;
  arrowOffset?: number;
  arrowRadius?: number;
  events?: { hover?: boolean; focus?: boolean; touch?: boolean };
  keepMounted?: boolean;
  positionDependencies?: React.DependencyList;
  clickOutsideEvents?: string[];
  id?: string;
  initialize?: boolean;
}

import React from 'react';

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: HanSize;
  radius?: HanSize;
  variant?: 'hover' | 'filled' | 'light' | 'outline' | 'transparent' | 'white' | 'default';
  color?: HanColor;
  iconSize?: number;
  disabled?: boolean;
}

export interface CopyButtonProps {
  children: (props: { copy: () => void; copied: boolean }) => React.ReactNode;
  value: string;
  timeout?: number;
  onCopied?: () => void;
  disabled?: boolean;
}

export interface FileButtonProps<Multiple extends boolean = false> {
  onChange: (payload: Multiple extends true ? File[] : File | null) => void;
  children: (props: { onClick: () => void }) => React.ReactNode;
  multiple?: Multiple;
  accept?: string;
  name?: string;
  form?: string;
  resetRef?: React.ForwardedRef<() => void>;
  disabled?: boolean;
  capture?: boolean | 'user' | 'environment';
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
}

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'div'> {
  separator?: React.ReactNode;
  separatorMargin?: HanSize;
  spacing?: HanSize | number;
  classNames?: {
    root?: string;
    separator?: string;
    breadcrumb?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    separator?: React.CSSProperties;
    breadcrumb?: React.CSSProperties;
  };
}

export interface BurgerProps extends React.ComponentPropsWithoutRef<'button'> {
  opened: boolean;
  onClick: () => void;
  size?: HanSize;
  color?: string;
  transitionDuration?: number;
}


export interface NavLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  active?: boolean;
  color?: HanColor;
  variant?: 'light' | 'filled' | 'subtle';
  disabled?: boolean;
  noWrap?: boolean;
  classNames?: {
    root?: string;
    icon?: string;
    rightSection?: string;
    label?: string;
    description?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    icon?: React.CSSProperties;
    rightSection?: React.CSSProperties;
    label?: React.CSSProperties;
    description?: React.CSSProperties;
  };
}

export interface PaginationProps {
  total: number;
  value?: number;
  onChange?: (page: number) => void;
  defaultValue?: number;
  siblings?: number;
  boundaries?: number;
  color?: HanColor;
  radius?: HanSize;
  size?: HanSize;
  withEdges?: boolean;
  withControls?: boolean;
  disabled?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
  dotsLabel?: string;
}

export interface StepperProps {
  active?: number;
  onStepClick?: (step: number) => void;
  color?: string;
  iconSize?: number;
  orientation?: 'horizontal' | 'vertical';
  size?: HanSize;
  children: React.ReactNode;
  allowNextStepsSelect?: boolean;
  completedIcon?: React.ReactNode;
  contentPadding?: string | number;
  iconPosition?: 'left' | 'right';
  styles?: Partial<{
    root: string;
    step: string;
    stepIcon: string;
    stepLabel: string;
  }>;
  classNames?: Partial<{
    root: string;
    step: string;
    stepIcon: string;
    stepLabel: string;
  }>;
  breakpoint?: string;
}

export interface StepProps {
  label: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}

export interface StepCompletedProps {
  children?: React.ReactNode;
}

export interface TabsProps {
  active?: number;
  onTabChange?: (tabIndex: number) => void;
  children: React.ReactNode;
  color?: string;
  orientation?: 'horizontal' | 'vertical';
  position?: 'left' | 'center' | 'right' | 'apart';
  variant?: 'default' | 'outline' | 'pills';
  styles?: Partial<{
    root: string;
    header: string;
    tab: string;
    content: string;
  }>;
  classNames?: Partial<{
    root: string;
    header: string;
    tab: string;
    content: string;
  }>;
}

export interface TabProps {
  label: string;
  children?: React.ReactNode;
}

export interface TabContentProps {
  children?: React.ReactNode;
}