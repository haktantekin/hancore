import React, { forwardRef, useCallback } from 'react';
import { InputProps, InputWrapperOrder } from 'types/type';

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  type = 'text',
  variant = 'default',
  size = 'sm',
  radius = 'sm',
  invalid = false,
  disabled = false,
  rightSection,
  rightSectionWidth,
  leftSection,
  leftSectionWidth,
  icon,
  iconWidth,
  placeholder,
  multiline = false,
  withAsterisk,
  error,
  description,
  label,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  inputContainer,
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

  const inputClass = `
    ${getVariantClass()}
    ${getSizeClass()}
    ${getRadiusClass()}
    ${invalid ? 'border-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    border
    w-full
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition duration-150 ease-in-out
    ${className || ''}
  `.trim();

  const InputComponent = multiline ? 'textarea' : 'input';

  const setRef = useCallback(
    (node: HTMLInputElement | HTMLTextAreaElement | null) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>).current = node;
      }
    },
    [ref]
  );

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
      <InputComponent
        ref={setRef}
        type={multiline ? undefined : type}
        className={inputClass}
        style={{
          paddingLeft: leftSection || icon ? `calc(${leftSectionWidth || iconWidth || '2rem'} + 0.5rem)` : undefined,
          paddingRight: rightSection ? `calc(${rightSectionWidth || '2rem'} + 0.5rem)` : undefined,
          ...style
        }}
        placeholder={placeholder}
        disabled={disabled}
        {...others}
      />
      {rightSection && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3" style={{ width: rightSectionWidth }}>
          {rightSection}
        </div>
      )}
    </div>
  );

  const renderInputWrapper = () => {
    return inputWrapperOrder.map((part: InputWrapperOrder, index: number) => {
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
      }
    });
  };

  return (
    <div {...wrapperProps}>
      {renderInputWrapper()}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;