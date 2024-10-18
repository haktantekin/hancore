import React, { forwardRef } from 'react';
import { SwitchProps } from 'types/type';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  checked,
  onChange,
  label,
  description,
  error,
  disabled = false,
  required = false,
  size = 'sm',
  radius = 'xl',
  color = 'blue',
  offLabel,
  onLabel,
  thumbIcon,
  labelPosition = 'right',
  wrapperProps,
  inputWrapperOrder = ['label', 'input', 'description', 'error'],
  id,
  name,
  value,
  form,
  className,
  style,
  ...others
}, ref) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-8 h-4';
      case 'sm': return 'w-10 h-5';
      case 'md': return 'w-12 h-6';
      case 'lg': return 'w-14 h-7';
      case 'xl': return 'w-16 h-8';
      default: return 'w-10 h-5';
    }
  };

  const getThumbSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      case 'xl': return 'w-7 h-7';
      default: return 'w-4 h-4';
    }
  };

  const getRadiusClass = () => {
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-full';
      default: return 'rounded-full';
    }
  };

  const inputClass = `
    ${getSizeClass()}
    ${getRadiusClass()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    relative inline-flex items-center
    bg-gray-200 transition-colors ease-in-out duration-200
    ${checked ? `bg-${color}-500` : ''}
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500
  `.trim();

  const thumbClass = `
    ${getThumbSizeClass()}
    ${getRadiusClass()}
    ${checked ? 'translate-x-full' : 'translate-x-0'}
    pointer-events-none inline-block transform
    bg-white shadow-lg ring-0 transition ease-in-out duration-200
  `.trim();

  const renderContent = () => {
    return inputWrapperOrder.map((part, index) => {
      switch (part) {
        case 'label':
          return label && (
            <span key={index} className="ml-2 text-sm font-medium text-gray-700">
              {label}
            </span>
          );
        case 'description':
          return description && (
            <p key={index} className="mt-1 text-sm text-gray-500">{description}</p>
          );
        case 'input':
          return (
            <div key={index} className="relative">
              <input
                type="checkbox"
                ref={ref}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                required={required}
                id={id}
                name={name}
                value={value}
                form={form}
                className="sr-only"
                {...others}
              />
              <div className={inputClass}>
                <span className="sr-only">Use setting</span>
                <span aria-hidden="true" className={thumbClass}>
                  {thumbIcon}
                </span>
                {offLabel && <span className="absolute left-1 text-xs">{offLabel}</span>}
                {onLabel && <span className="absolute right-1 text-xs">{onLabel}</span>}
              </div>
            </div>
          );
        case 'error':
          return error && (
            <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
          );
        default:
          return null;
      }
    });
  };

  return (
    <label
      className={`inline-flex ${labelPosition === 'left' ? 'flex-row-reverse' : ''} items-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className || ''}`}
      style={style}
      {...wrapperProps}
    >
      {renderContent()}
    </label>
  );
});

Switch.displayName = 'Switch';

export default Switch;