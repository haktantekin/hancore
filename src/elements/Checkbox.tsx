import React, { forwardRef } from 'react';
import { CheckboxProps } from 'types/type';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked = false,
  defaultChecked,
  onChange,
  label,
  description,
  error,
  disabled = false,
  indeterminate = false,
  id,
  size = 'sm',
  radius = 'sm',
  color = 'blue',
  labelPosition = 'right',
  wrapperProps,
  required,
  readOnly,
  name,
  value,
  form,
  icon,
  ...rest
}, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? checked);

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly) {
      setInternalChecked(event.target.checked);
      onChange?.(event);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-3 h-3 text-xs';
      case 'sm': return 'w-4 h-4 text-sm';
      case 'md': return 'w-5 h-5 text-base';
      case 'lg': return 'w-6 h-6 text-lg';
      case 'xl': return 'w-7 h-7 text-xl';
      default: return 'w-4 h-4 text-sm';
    }
  };

  const getRadiusClass = () => {
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-2xl';
      case 'full': return 'rounded-full';
      default: return 'rounded-md';
    }
  };

  const getColorClass = () => {
    if (disabled) return 'bg-gray-200 border-gray-300';
    if (error) return 'border-red-500';
    switch (color) {
      case 'blue': return 'bg-blue-500 border-blue-500';
      case 'green': return 'bg-green-500 border-green-500';
      case 'red': return 'bg-red-500 border-red-500';
      default: return 'bg-blue-500 border-blue-500';
    }
  };

  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  const checkboxContent = (
    <>
      <div className="relative">
        <input
          type="checkbox"
          id={checkboxId}
          checked={internalChecked}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          name={name}
          value={value}
          form={form}
          ref={ref}
          className="sr-only"
          {...rest}
        />
        <div className={`${getSizeClass()} ${getRadiusClass()} border-2 ${internalChecked || indeterminate ? getColorClass() : 'border-gray-300 bg-white'}`}>
          {(internalChecked || indeterminate) && (
            icon || (
              <svg className="fill-current w-full h-full text-white" viewBox="0 0 20 20">
                {indeterminate ? (
                  <path d="M4 10h12" stroke="currentColor" strokeWidth="2" />
                ) : (
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                )}
              </svg>
            )
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="ml-2">
          {label && (
            <label htmlFor={checkboxId} className={`${error ? 'text-red-500' : ''} ${disabled ? 'text-gray-400' : ''}`}>
              {label}
            </label>
          )}
          {description && (
            <p className={`text-sm ${error ? 'text-red-400' : 'text-gray-500'} ${disabled ? 'text-gray-300' : ''}`}>
              {description}
            </p>
          )}
        </div>
      )}
    </>
  );

  return (
    <div
      {...wrapperProps}
      className={`inline-flex ${labelPosition === 'left' ? 'flex-row-reverse' : 'items-center'} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${wrapperProps?.className || ''}`}
    >
      {checkboxContent}
      {error && typeof error === 'string' && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;