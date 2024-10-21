import React, { forwardRef } from 'react';
import { CloseButtonProps } from 'types/type';

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(({
  size = 'md',
  radius = 'xl',
  variant = 'hover',
  color,
  iconSize,
  disabled = false,
  className,
  style,
  ...others
}, ref) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4';
      case 'sm': return 'w-6 h-6';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-10 h-10';
      case 'xl': return 'w-12 h-12';
      default: return 'w-8 h-8';
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

  const getVariantClass = () => {
    switch (variant) {
      case 'filled':
        return `bg-${color || 'gray'}-500 text-white hover:bg-${color || 'gray'}-600`;
      case 'light':
        return `bg-${color || 'gray'}-100 text-${color || 'gray'}-700 hover:bg-${color || 'gray'}-200`;
      case 'outline':
        return `border border-${color || 'gray'}-500 text-${color || 'gray'}-500 hover:bg-${color || 'gray'}-50`;
      case 'transparent':
        return `text-${color || 'gray'}-500 hover:bg-${color || 'gray'}-50`;
      case 'white':
        return 'bg-white text-black hover:bg-gray-50';
      case 'default':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      case 'hover':
      default:
        return `text-${color || 'gray'}-500 hover:bg-${color || 'gray'}-100`;
    }
  };

  const buttonClass = `
    ${getSizeClass()}
    ${getRadiusClass()}
    ${getVariantClass()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    flex items-center justify-center
    transition duration-150 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-${color || 'gray'}-500 focus:ring-opacity-50
    ${className || ''}
  `.trim();

  const getIconSize = () => {
    if (iconSize) return iconSize;
    switch (size) {
      case 'xs': return 10;
      case 'sm': return 12;
      case 'md': return 16;
      case 'lg': return 20;
      case 'xl': return 24;
      default: return 16;
    }
  };

  return (
    <button
      ref={ref}
      className={buttonClass}
      style={style}
      disabled={disabled}
      type="button"
      aria-label="Close"
      {...others}
    >
      <svg
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={getIconSize()}
        height={getIconSize()}
      >
        <path
          d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;