import React, { forwardRef, useRef, useState } from 'react';
import { FileInputProps } from 'types/type';

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
  label,
  description,
  error,
  required,
  withAsterisk,
  clearable = true,
  multiple = false,
  accept,
  placeholder = 'Pick file',
  icon,
  rightSection,
  rightSectionWidth,
  iconWidth,
  disabled = false,
  radius = 'sm',
  size = 'sm',
  variant = 'default',
  value,
  onChange,
  onFocus,
  onBlur,
  name,
  form,
  valueComponent,
  clearButtonLabel = 'Clear',
  readOnly = false,
  capture,
  fileInputProps,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  ...others
}, ref) => {
  const [focused, setFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onChange?.(multiple ? Array.from(files || []) : files?.[0] || null);
  };

  const handleClear = () => {
    onChange?.(multiple ? [] : null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
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

  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 border-transparent';
      case 'unstyled':
        return 'border-none shadow-none bg-transparent';
      default:
        return 'bg-white border-gray-300';
    }
  };

  const inputClass = `
    ${getRadiusClass()}
    ${getSizeClass()}
    ${getVariantClass()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${error ? 'border-red-500' : ''}
    ${focused ? 'ring-2 ring-blue-500' : ''}
    border
    w-full
    focus:outline-none
  `.trim();

  const renderValue = () => {
    if (valueComponent) {
      return valueComponent({ value });
    }
    if (multiple) {
      return Array.isArray(value) ? `${value.length} file(s) selected` : placeholder;
    }
    return value ? (value as File).name : placeholder;
  };

  const renderInputWrapper = () => {
    return inputWrapperOrder.map((part, index) => {
      switch (part) {
        case 'label':
          return label && (
            <label key={index} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {(withAsterisk || required) && <span className="text-red-500 ml-1">*</span>}
            </label>
          );
        case 'description':
          return description && (
            <p key={index} className="text-sm text-gray-500 mb-1">{description}</p>
          );
        case 'input':
          return (
            <div key={index} className="relative">
              {icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ width: iconWidth }}>
                  {icon}
                </div>
              )}
              <div className={inputClass}>
                {renderValue()}
              </div>
              <input
                type="file"
                ref={ref || fileInputRef}
                className="sr-only"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiple={multiple}
                accept={accept}
                disabled={disabled || readOnly}
                name={name}
                form={form}
                capture={capture}
                {...fileInputProps}
                {...others}
              />
              {rightSection && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ width: rightSectionWidth }}>
                  {rightSection}
                </div>
              )}
              {clearable && value && !disabled && !readOnly && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  aria-label={clearButtonLabel}
                >
                  &times;
                </button>
              )}
            </div>
          );
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

FileInput.displayName = 'FileInput';

export default FileInput;