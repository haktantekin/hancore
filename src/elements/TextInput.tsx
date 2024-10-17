import React, { forwardRef } from 'react';
import { TextInputProps } from 'types/type';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  description,
  error,
  required,
  disabled,
  id,
  placeholder,
  size = 'sm',
  radius = 'sm',
  variant = 'default',
  withAsterisk,
  rightSection,
  leftSection,
  icon,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  inputContainer,
  rightSectionWidth,
  leftSectionWidth,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'text-xs h-6 px-2';
      case 'sm': return 'text-sm h-8 px-3';
      case 'md': return 'text-base h-10 px-3';
      case 'lg': return 'text-lg h-12 px-4';
      case 'xl': return 'text-xl h-14 px-4';
      default: return 'text-sm h-8 px-3';
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

  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 border-transparent focus:bg-white';
      case 'unstyled':
        return 'border-none shadow-none';
      default:
        return 'bg-white border-gray-300 focus:border-blue-500';
    }
  };

  const inputElement = (
    <div className="relative" style={{ width: inputContainer ? '100%' : 'auto' }}>
      {leftSection && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ width: leftSectionWidth }}>
          {leftSection}
        </div>
      )}
      {icon && !leftSection && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        id={inputId}
        ref={ref}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        className={`
          ${getSizeClass()}
          ${getRadiusClass()}
          ${getVariantClass()}
          w-full
          border
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
          ${leftSection || icon ? 'pl-10' : ''}
          ${rightSection ? 'pr-10' : ''}
        `}
        {...rest}
      />
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
            <label key={index} htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {(withAsterisk || required) && <span className="text-red-500 ml-1">*</span>}
            </label>
          );
        case 'description':
          return description && (
            <p key={index} className="text-sm text-gray-500 mb-1">{description}</p>
          );
        case 'input':
          return <div key={index}>{inputContainer ? inputContainer(inputElement) : inputElement}</div>;
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

TextInput.displayName = 'TextInput';

export default TextInput;