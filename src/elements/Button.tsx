import React from 'react';
import { ButtonProps, LoaderProps } from '../types/type';

const BUTTON_SIZES = {
  small: '8px 12px',
  medium: '10px 16px',
  large: '12px 20px'
};

const Loader: React.FC<LoaderProps> = React.memo(({ size = 16, color }) => (
  <span
    style={{
      width: size,
      height: size,
      border: `2px solid ${color}`,
      borderRadius: '50%',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite',
    }}
  />
));

const Button: React.FC<ButtonProps> = React.memo(({
  size = 'medium',
  type = 'button',
  textColor = 'gray',
  bgColor = '#FFFFFF',
  leftIcon,
  rightIcon,
  fullWidth = false,
  radius = 0,
  variant = 'color',
  gradient,
  uppercase = false,
  loading = false,
  loaderProps,
  loaderPosition = 'center',
  children,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const getButtonStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      padding: BUTTON_SIZES[size],
      borderRadius: radius,
      color: textColor,
      backgroundColor: bgColor,
      width: fullWidth ? '100%' : 'auto',
      textTransform: uppercase ? 'uppercase' : 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: loaderPosition === 'left' ? 'flex-start' : loaderPosition === 'right' ? 'flex-end' : 'center',
    };

    if (variant === 'gradient' && gradient) {
      styles.background = `linear-gradient(${gradient.deg || 90}deg, ${gradient.from}, ${gradient.to})`;
    } else if (variant === 'color') {
      styles.backgroundColor = bgColor;
      styles.color = textColor;
    }

    return styles;
  };

  return (
    <button
      type={type}
      style={getButtonStyles()}
      className={className}
      disabled={disabled}
      aria-busy={loading}
      aria-label={ariaLabel}
      data-testid="custom-button"
    >
      {loading && loaderPosition === 'left' && <Loader size={loaderProps?.size} color={textColor} />}
      {leftIcon && !loading && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}
      {loading && loaderPosition === 'center' ? (
        <Loader size={loaderProps?.size} color={textColor} />
      ) : (
        <span>{children}</span>
      )}
      {rightIcon && !loading && <span style={{ marginLeft: '8px' }}>{rightIcon}</span>}
      {loading && loaderPosition === 'right' && <Loader size={loaderProps?.size} color={textColor} />}
    </button>
  );
});

Button.displayName = 'Button';
Loader.displayName = 'Loader';

export default Button;