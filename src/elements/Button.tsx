import React from 'react';
import { ButtonProps, LoaderProps } from '../types/type';

export default function Button({
  size = 'medium',
  type = 'button',
  textColor = 'blue',
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
  className = ''
}: Readonly<ButtonProps>) {

  const getButtonStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {
      padding: size === 'small' ? '8px 12px' : size === 'large' ? '12px 20px' : '10px 16px',
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
    >
      {loading && loaderPosition === 'left' && <Loader size={loaderProps?.size} color={textColor} />}
      {leftIcon && !loading && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}
      {loading ? (
        <Loader size={loaderProps?.size} color={textColor} />
      ) : (
        <span>{children}</span>
      )}
      {rightIcon && !loading && <span style={{ marginLeft: '8px' }}>{rightIcon}</span>}
      {loading && loaderPosition === 'right' && <Loader size={loaderProps?.size} color={textColor} />}
    </button>
  );
}

const Loader = ({ size = 16, color }: LoaderProps) => (
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
);
