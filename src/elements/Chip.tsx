import React, { forwardRef } from 'react';
import { ChipProps } from 'types/type';

const Chip = forwardRef<HTMLInputElement, ChipProps>(({
  checked,
  defaultChecked,
  onChange,
  children,
  disabled = false,
  id,
  size = 'sm',
  radius = 'xl',
  color = 'blue',
  variant = 'outline',
  wrapperProps,
  required,
  name,
  value,
  form,
  type = 'checkbox',
  ...rest
}, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? checked);

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setInternalChecked(event.target.checked);
      onChange?.(event);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'text-xs py-1 px-2';
      case 'sm': return 'text-sm py-1 px-3';
      case 'md': return 'text-base py-2 px-4';
      case 'lg': return 'text-lg py-2 px-5';
      case 'xl': return 'text-xl py-3 px-6';
      default: return 'text-sm py-1 px-3';
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

  const getColorClass = () => {
    if (disabled) return 'bg-gray-200 text-gray-400 border-gray-300';
    if (internalChecked) {
      switch (variant) {
        case 'filled':
          return `bg-${color}-500 text-white`;
        case 'outline':
          return `bg-${color}-100 text-${color}-700 border-${color}-500`;
        case 'light':
          return `bg-${color}-50 text-${color}-700`;
        default:
          return `bg-${color}-500 text-white`;
      }
    }
    return `bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;
  };

  const chipId = id || `chip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      {...wrapperProps}
      className={`inline-flex items-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${wrapperProps?.className || ''}`}
    >
      <input
        type={type}
        id={chipId}
        checked={internalChecked}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        name={name}
        value={value}
        form={form}
        ref={ref}
        className="sr-only"
        {...rest}
      />
      <label
        htmlFor={chipId}
        className={`
          ${getSizeClass()}
          ${getRadiusClass()}
          ${getColorClass()}
          border
          transition-colors
          duration-200
          ease-in-out
          select-none
          ${disabled ? 'opacity-50' : 'hover:bg-opacity-80'}
        `}
      >
        {children}
      </label>
    </div>
  );
});

Chip.displayName = 'Chip';

export default Chip;