// Fieldset.tsx
import React from 'react';
import { FieldsetProps } from 'types/type';

const Fieldset: React.FC<FieldsetProps> = ({
  children,
  legend,
  variant = 'default',
  disabled = false,
  radius = 'sm',
  unstyled = false,
  withAsterisk = false,
  style,
  className,
  ...others
}) => {
  const getVariantClass = () => {
    if (unstyled) return '';
    switch (variant) {
      case 'filled':
        return 'bg-gray-100 border-transparent';
      case 'unstyled':
        return 'border-none';
      default:
        return 'bg-white border-gray-300';
    }
  };

  const getRadiusClass = () => {
    if (unstyled) return '';
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-2xl';
      default: return 'rounded-md';
    }
  };

  const fieldsetClass = `
    ${unstyled ? '' : 'border p-4'}
    ${getVariantClass()}
    ${getRadiusClass()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className || ''}
  `.trim();

  return (
    <fieldset className={fieldsetClass} disabled={disabled} style={style} {...others}>
      {legend && (
        <legend className={`px-2 ${unstyled ? '' : 'font-bold'}`}>
          {legend}
          {withAsterisk && <span className="text-red-500 ml-1">*</span>}
        </legend>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </fieldset>
  );
};

export default Fieldset;