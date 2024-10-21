import React, { forwardRef } from 'react';
import { ButtonProps } from 'types/type';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'filled',
  color = 'blue',
  size = 'sm',
  radius = 'sm',
  fullWidth = false,
  leftIcon,
  rightIcon,
  uppercase = false,
  compact = false,
  loading = false,
  loaderProps,
  loaderPosition = 'left',
  disabled = false,
  gradient,
  className,
  style,
  ...others
}, ref) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return `bg-${color}-500 text-white hover:bg-${color}-600`;
      case 'light':
        return `bg-${color}-50 text-${color}-500 hover:bg-${color}-100`;
      case 'outline':
        return `border border-${color}-500 text-${color}-500 hover:bg-${color}-50`;
      case 'subtle':
        return `text-${color}-500 hover:bg-${color}-50`;
      case 'white':
        return 'bg-white text-black hover:bg-gray-50';
      case 'default':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'gradient':
        return gradient ? `bg-gradient-to-r from-${gradient.from} to-${gradient.to} text-white` : '';
      default:
        return '';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'text-xs py-1 px-2';
      case 'sm': return 'text-sm py-2 px-3';
      case 'md': return 'text-base py-2 px-4';
      case 'lg': return 'text-lg py-3 px-5';
      case 'xl': return 'text-xl py-4 px-6';
      default: return 'text-sm py-2 px-3';
    }
  };

  const getRadiusClass = () => {
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-2xl';
      default: return 'rounded-md';
    }
  };

  const buttonClass = `
    ${getVariantClass()}
    ${getSizeClass()}
    ${getRadiusClass()}
    ${fullWidth ? 'w-full' : ''}
    ${uppercase ? 'uppercase' : ''}
    ${compact ? 'py-0.5' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    transition duration-150 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50
    ${className ?? ''}
  `.trim();

  const renderLoader = () => {
    const defaultLoader = <span className="animate-spin">◌</span>;
    if (loaderProps?.children) {
      return React.cloneElement(loaderProps.children as React.ReactElement, {
        ...loaderProps,
        className: `${loaderProps.className ?? ''} ${loaderPosition === 'right' ? 'ml-2' : 'mr-2'}`,
      });
    }
    return (
      <span className={`${loaderPosition === 'right' ? 'ml-2' : 'mr-2'}`}>
        {defaultLoader}
      </span>
    );
  };

  const renderContent = () => {
    return (
      <>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {loading && loaderPosition === 'left' && renderLoader()}
        {children}
        {loading && loaderPosition === 'right' && renderLoader()}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </>
    );
  };

  return (
    <button
      ref={ref}
      className={buttonClass}
      style={style}
      disabled={disabled || loading}
      {...others}
    >
      {renderContent()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;