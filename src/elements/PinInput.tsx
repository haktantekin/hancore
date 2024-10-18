import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { PinInputProps } from 'types/type';

const PinInput = forwardRef<HTMLDivElement, PinInputProps>(({
  length = 4,
  type = 'text',
  mask,
  placeholder = '○',
  disabled = false,
  error = false,
  variant = 'default',
  size = 'sm',
  radius = 'sm',
  oneTimeCode = false,
  manageFocus = true,
  preserveInputOrder = true,
  onComplete,
  onChange,
  inputMode = 'text',
  autoFocus = false,
  id,
  name,
  form,
  initialFocusedIndex = 0,
  ...others
}, ref) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const setInputRef = useCallback((index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
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
      case 'xs': return 'w-8 h-8 text-xs';
      case 'sm': return 'w-10 h-10 text-sm';
      case 'md': return 'w-12 h-12 text-base';
      case 'lg': return 'w-14 h-14 text-lg';
      case 'xl': return 'w-16 h-16 text-xl';
      default: return 'w-10 h-10 text-sm';
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
    text-center
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition duration-150 ease-in-out
  `.trim();

  const handleChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (onChange) {
      onChange(newValues.join(''));
    }

    if (value && manageFocus && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newValues.every(v => v !== '') && onComplete) {
      onComplete(newValues.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0 && manageFocus) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const newValues = [...values];
    for (let i = 0; i < pastedData.length; i++) {
      newValues[i] = pastedData[i];
    }
    setValues(newValues);
    if (onChange) {
      onChange(newValues.join(''));
    }
    if (newValues.every(v => v !== '') && onComplete) {
      onComplete(newValues.join(''));
    }
  };

  return (
    <div ref={ref} {...others}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={setInputRef(index)}
          type={type}
          inputMode={inputMode}
          value={mask ? mask : values[index]}
          onChange={e => handleChange(index, e.target.value.slice(-1))}
          onKeyDown={e => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={placeholder}
          className={inputClass}
          autoFocus={autoFocus && index === initialFocusedIndex}
          aria-label={`Digit ${index + 1}`}
          id={id ? `${id}-${index}` : undefined}
          name={name ? `${name}-${index}` : undefined}
          form={form}
          autoComplete={oneTimeCode ? 'one-time-code' : 'off'}
          style={preserveInputOrder ? { order: index } : undefined}
        />
      ))}
    </div>
  );
});

PinInput.displayName = 'PinInput';

export default PinInput;