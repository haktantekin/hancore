import React, { forwardRef } from 'react';
import { RadioGroupProps, RadioProps } from 'types/type';

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  description,
  error,
  value,
  checked,
  onChange,
  name,
  size = 'sm',
  color = 'blue',
  disabled = false,
  labelPosition = 'right',
  wrapperProps,
  inputWrapperOrder = ['label', 'description', 'input', 'error'],
  className,
  style,
  ...others
}, ref) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-5 h-5';
      case 'lg': return 'w-6 h-6';
      case 'xl': return 'w-7 h-7';
      default: return 'w-4 h-4';
    }
  };

  const getColorClass = () => {
    if (disabled) return 'bg-gray-200 border-gray-300';
    if (error) return 'border-red-500';
    return `text-${color}-500`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  const inputElement = (
    <div className="relative flex items-center">
      <input
        type="radio"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        name={name}
        value={value}
        disabled={disabled}
        className={`
          ${getSizeClass()}
          ${getColorClass()}
          border rounded-full
          focus:ring-2 focus:ring-offset-2 focus:ring-${color}-500
          transition duration-150 ease-in-out
          ${className || ''}
        `}
        style={style}
        {...others}
      />
      <div className={`absolute inset-0 ${getSizeClass()} pointer-events-none`}>
        {checked && (
          <div className={`absolute inset-0 m-auto w-1/2 h-1/2 rounded-full bg-current`} />
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    return inputWrapperOrder.map((part, index) => {
      switch (part) {
        case 'label':
          return label && (
            <span key={index} className="ml-2 text-sm font-medium text-gray-700">
              {label}
            </span>
          );
        case 'description':
          return description && (
            <p key={index} className="mt-1 text-sm text-gray-500">{description}</p>
          );
        case 'input':
          return <div key={index}>{inputElement}</div>;
        case 'error':
          return error && (
            <p key={index} className="mt-1 text-sm text-red-500">{error}</p>
          );
        default:
          return null;
      }
    });
  };

  return (
    <label
      className={`inline-flex ${labelPosition === 'left' ? 'flex-row-reverse' : ''} items-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      {...wrapperProps}
    >
      {renderContent()}
    </label>
  );
});

Radio.displayName = 'Radio';

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  value,
  onChange,
  name,
  label,
  description,
  error,
  orientation = 'vertical',
  spacing = 'sm',
  offset = 'sm',
  ...others
}) => {
  const getSpacingClass = () => {
    switch (spacing) {
      case 'xs': return 'space-y-1';
      case 'sm': return 'space-y-2';
      case 'md': return 'space-y-3';
      case 'lg': return 'space-y-4';
      case 'xl': return 'space-y-5';
      default: return 'space-y-2';
    }
  };

  const getOffsetClass = () => {
    switch (offset) {
      case 'xs': return 'mt-1';
      case 'sm': return 'mt-2';
      case 'md': return 'mt-3';
      case 'lg': return 'mt-4';
      case 'xl': return 'mt-5';
      default: return 'mt-2';
    }
  };

  const handleRadioChange = (radioValue: string) => {
    onChange?.(radioValue);
  };

  return (
    <div {...others}>
      {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
      {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      <div className={`${getOffsetClass()} ${orientation === 'horizontal' ? 'flex space-x-4' : getSpacingClass()}`}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement<RadioProps>(child)) {
            return React.cloneElement(child, {
              name,
              checked: child.props.value === value,
              onChange: () => handleRadioChange(child.props.value as string),
            });
          }
          return child;
        })}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export { RadioGroup };
export default Radio;