import React, { forwardRef, useEffect, useRef, useCallback } from 'react';
import { InputWrapperOrder, TextareaProps } from 'types/type';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
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
  autosize = false,
  minRows = 2,
  maxRows,
  variant = 'default',
  size = 'sm',
  radius = 'sm',
  withAsterisk = false,
  rightSection,
  rightSectionWidth,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  className,
  style,
  ...others
}, ref) => {
  const innerRef = useRef<HTMLTextAreaElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const adjustTextareaHeight = useCallback(() => {
    const textarea = innerRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, getMaxHeight());
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  const getMaxHeight = useCallback(() => {
    if (maxRows && innerRef.current) {
      const lineHeight = parseInt(getComputedStyle(innerRef.current).lineHeight);
      return maxRows * lineHeight;
    }
    return Infinity;
  }, [maxRows]);

  useEffect(() => {
    if (autosize) {
      adjustTextareaHeight();
    }
  }, [value, autosize, adjustTextareaHeight]);

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

  const textareaClass = `
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (autosize) {
      adjustTextareaHeight();
    }
  };

  const textareaElement = (
    <div className="relative">
      <textarea
        ref={setRefs}
        value={value}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={textareaClass}
        style={{
          minHeight: autosize ? `${minRows * 20}px` : undefined,
          maxHeight: maxRows ? `${maxRows * 20}px` : undefined,
          resize: autosize ? 'none' : undefined,
          overflow: autosize ? 'hidden' : undefined,
          ...style
        }}
        rows={autosize ? minRows : undefined}
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
          return <div key={index}>{textareaElement}</div>;
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

Textarea.displayName = 'Textarea';

export default Textarea;