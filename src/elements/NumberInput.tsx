import React, { forwardRef, useState, useEffect, useCallback } from 'react';
import { NumberInputProps } from 'types/type';

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  value,
  onChange,
  onBlur,
  min,
  max,
  step = 1,
  precision,
  defaultValue,
  disabled = false,
  required = false,
  label,
  description,
  error,
  variant = 'default',
  size = 'sm',
  radius = 'sm',
  withAsterisk = false,
  hideControls = false,
  rightSection,
  rightSectionWidth,
  icon,
  iconWidth,
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  decimalSeparator = '.',
  thousandSeparator = ',',
  formatter,
  parser,
  prefix,
  suffix,
  className,
  style,
  ...others
}, ref) => {
  const [internalValue, setInternalValue] = useState<string>(
    (value !== undefined ? value : defaultValue)?.toString() || ''
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(formatValue(value));
    }
  }, [value]);

  const formatValue = useCallback((val: number | string): string => {
    if (formatter) return formatter(val);
    let formatted = typeof val === 'number' ? val.toFixed(precision) : val.toString();
    if (thousandSeparator) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
      formatted = parts.join(decimalSeparator);
    }
    if (prefix) formatted = prefix + formatted;
    if (suffix) formatted = formatted + suffix;
    return formatted;
  }, [formatter, precision, thousandSeparator, decimalSeparator, prefix, suffix]);

  const parseValue = useCallback((val: string): number => {
    if (parser) return parser(val);
    let parsed = val.replace(new RegExp(`[^\\d${decimalSeparator}-]`, 'g'), '');
    parsed = parsed.replace(decimalSeparator, '.');
    return parseFloat(parsed);
  }, [parser, decimalSeparator]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      const parsedValue = parseValue(newValue);
      onChange(parsedValue, e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const parsedValue = parseValue(internalValue);
    const clampedValue = Math.min(Math.max(parsedValue, min || -Infinity), max || Infinity);
    setInternalValue(formatValue(clampedValue));
    if (onBlur) onBlur(e);
    if (onChange && parsedValue !== clampedValue) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: clampedValue.toString() },
        currentTarget: { ...e.currentTarget, value: clampedValue.toString() },
      };
      onChange(clampedValue, syntheticEvent);
    }
  };

  const handleInternalChange = useCallback((newValue: number) => {
    setInternalValue(formatValue(newValue));
    if (onChange) {
      const syntheticEvent = {
        target: { value: newValue.toString() },
        currentTarget: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      
      onChange(newValue, syntheticEvent);
    }
  }, [onChange, formatValue]);

  const increment = () => {
    const currentValue = parseValue(internalValue);
    const newValue = Math.min(currentValue + step, max || Infinity);
    handleInternalChange(newValue);
  };

  const decrement = () => {
    const currentValue = parseValue(internalValue);
    const newValue = Math.max(currentValue - step, min || -Infinity);
    handleInternalChange(newValue);
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'filled': return 'bg-gray-100 border-transparent focus:bg-white';
      case 'unstyled': return 'border-none shadow-none bg-transparent';
      default: return 'bg-white border-gray-300 focus:border-blue-500';
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
    ${error ? 'border-red-500' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    border
    w-full
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition duration-150 ease-in-out
    ${className || ''}
  `.trim();

  const inputElement = (
    <div className="relative flex items-stretch">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3" style={{ width: iconWidth }}>
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type="text"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
        required={required}
        className={inputClass}
        style={{
          paddingLeft: icon ? `calc(${iconWidth || '2rem'} + 0.5rem)` : undefined,
          paddingRight: rightSection || !hideControls ? `calc(${rightSectionWidth || '2rem'} + 0.5rem)` : undefined,
          ...style
        }}
        {...others}
      />
      {!hideControls && (
        <div className="absolute inset-y-0 right-0 flex flex-col">
          <button
            type="button"
            onClick={increment}
            className="flex-1 px-2 bg-gray-200 text-gray-600 hover:bg-gray-300"
            disabled={disabled || (max !== undefined && parseValue(internalValue) >= max)}
          >
            +
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 px-2 bg-gray-200 text-gray-600 hover:bg-gray-300"
            disabled={disabled || (min !== undefined && parseValue(internalValue) <= min)}
          >
            -
          </button>
        </div>
      )}
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
          return <div key={index}>{inputElement}</div>;
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

NumberInput.displayName = 'NumberInput';

export default NumberInput;