import React, { forwardRef, useState, useCallback } from 'react';
import { PasswordInputProps } from 'types/type';

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
  value,
  onChange,
  onFocus,
  onBlur,
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
  visibilityToggleIcon,
  visibilityToggleButtonProps,
  rightSection,
  rightSectionWidth,
  leftSection,
  leftSectionWidth,
  icon,
  iconWidth,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  inputContainer,
  visible = false,
  toggleTabIndex = 0,
  className,
  style,
  ...others
}, ref) => {
  const [isVisible, setIsVisible] = useState(visible);

  const handleToggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  const getVariantClass = useCallback(() => {
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 border-transparent focus:bg-white';
      case 'unstyled':
        return 'border-none shadow-none bg-transparent';
      default:
        return 'bg-white border-gray-300 focus:border-blue-500';
    }
  }, [variant]);

  const getSizeClass = useCallback(() => {
    switch (size) {
      case 'xs': return 'text-xs py-1 px-2';
      case 'sm': return 'text-sm py-2 px-3';
      case 'md': return 'text-base py-2 px-4';
      case 'lg': return 'text-lg py-3 px-5';
      case 'xl': return 'text-xl py-4 px-6';
      default: return 'text-sm py-2 px-3';
    }
  }, [size]);

  const getRadiusClass = useCallback(() => {
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-2xl';
      default: return 'rounded-md';
    }
  }, [radius]);

  const inputClass = `
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

  const renderToggleIcon = useCallback(() => {
    if (typeof visibilityToggleIcon === 'function') {
      return visibilityToggleIcon({ reveal: isVisible });
    }
    if (React.isValidElement(visibilityToggleIcon)) {
      return visibilityToggleIcon;
    }
    return isVisible ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
        <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z" clipRule="evenodd" />
        <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
      </svg>
    );
  }, [isVisible, visibilityToggleIcon]);

  const inputElement = (
    <div className="relative">
      {leftSection && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ width: leftSectionWidth }}>
          {leftSection}
        </div>
      )}
      {icon && !leftSection && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ width: iconWidth }}>
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClass}
        style={{
          paddingLeft: leftSection || icon ? `calc(${leftSectionWidth || iconWidth || '2rem'} + 0.5rem)` : undefined,
          paddingRight: rightSection || visibilityToggleIcon ? `calc(${rightSectionWidth || '2rem'} + 0.5rem)` : undefined,
          ...style
        }}
        {...others}
      />
      {visibilityToggleIcon !== null && (
        <button
          type="button"
          onClick={handleToggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
          tabIndex={toggleTabIndex}
          {...visibilityToggleButtonProps}
        >
          {renderToggleIcon()}
        </button>
      )}
      {rightSection && !visibilityToggleIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3" style={{ width: rightSectionWidth }}>
          {rightSection}
        </div>
      )}
    </div>
  );

  const renderInputWrapper = useCallback(() => {
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
          return <div key={index}>{inputContainer ? inputContainer(inputElement) : inputElement}</div>;
        case 'error':
          return error && (
            <p key={index} className="text-sm text-red-500 mt-1">{error}</p>
          );
        default:
          return null;
      }
    });
  }, [label, description, error, withAsterisk, inputContainer, inputElement, inputWrapperOrder]);

  return (
    <div {...wrapperProps}>
      {renderInputWrapper()}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;