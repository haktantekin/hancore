import React, { forwardRef } from 'react';
import { NativeSelectProps } from 'types/type';

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(({
  data,
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  disabled = false,
  required = false,
  variant = 'default',
  size = 'sm',
  radius = 'sm',
  withAsterisk = false,
  rightSection,
  rightSectionWidth,
  icon,
  iconWidth,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  className,
  style,
  ...others
}, ref) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 border-transparent focus:bg-white';
      case 'unstyled':
        return 'border-none shadow-none bg-transparent';
      default:
        return 'bg-white border-gray-300 focus:border-blue-500';
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

  const selectClass = `
    ${getVariantClass()}
    ${getSizeClass()}
    ${getRadiusClass()}
    ${error ? 'border-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    border
    w-full
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition duration-150 ease-in-out
    ${className || ''}
  `.trim();

  const renderOptions = () => {
    if (Array.isArray(data)) {
      return data.map((item, index) => (
        <option key={index} value={typeof item === 'string' ? item : item.value}>
          {typeof item === 'string' ? item : item.label}
        </option>
      ));
    }
    return null;
  };

  const selectElement = (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ width: iconWidth }}>
          {icon}
        </div>
      )}
      <select
        ref={ref}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClass}
        style={{
          paddingLeft: icon ? `calc(${iconWidth || '2rem'} + 0.5rem)` : undefined,
          paddingRight: rightSection ? `calc(${rightSectionWidth || '2rem'} + 0.5rem)` : undefined,
          ...style
        }}
        {...others}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {renderOptions()}
      </select>
      {rightSection && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3" style={{ width: rightSectionWidth }}>
          {rightSection}
        </div>
      )}
    </div>
  );

  const renderInputWrapper = () => {
    return inputWrapperOrder.map((part, index) => {
      switch (part) {
        case 'label':
          return label && (
            <label key={index} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {withAsterisk && <span className="text-red-500 ml-1">*</span>}
            </label>
          );
        case 'description':
          return description && (
            <p key={index} className="text-sm text-gray-500 mb-1">{description}</p>
          );
        case 'input':
          return <div key={index}>{selectElement}</div>;
        case 'error':
          return error && (
            <p key={index} className="text-sm text-red-500 mt-1">{error}</p>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div {...wrapperProps}>
      {renderInputWrapper()}
    </div>
  );
});

NativeSelect.displayName = 'NativeSelect';

export default NativeSelect;