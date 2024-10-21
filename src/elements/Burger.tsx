import React from 'react';
import { BurgerProps } from 'types/type';

const Burger: React.FC<BurgerProps> = ({
  opened,
  onClick,
  size = 'md',
  color,
  transitionDuration = 300,
  className,
  style,
  ...others
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4';
      case 'sm': return 'w-5 h-5';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-10 h-10';
      default: return 'w-6 h-6';
    }
  };

  const getBarSizeClass = () => {
    switch (size) {
      case 'xs': return 'h-[1px] w-4';
      case 'sm': return 'h-[2px] w-5';
      case 'md': return 'h-[2px] w-6';
      case 'lg': return 'h-[3px] w-8';
      case 'xl': return 'h-[4px] w-10';
      default: return 'h-[2px] w-6';
    }
  };

  const burgerClass = `
    relative
    ${getSizeClass()}
    ${className ?? ''}
  `.trim();

  const barClass = `
    absolute
    left-0
    ${getBarSizeClass()}
    transition-all
    duration-${transitionDuration}
    ease-in-out
    ${color ? `bg-${color}` : 'bg-current'}
  `.trim();

  return (
    <button
      type="button"
      className={burgerClass}
      style={style}
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={opened}
      {...others}
    >
      <div
        className={`${barClass} ${opened ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`}
      />
      <div
        className={`${barClass} top-1/2 -translate-y-1/2 ${opened ? 'opacity-0' : ''}`}
      />
      <div
        className={`${barClass} ${opened ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'}`}
      />
    </button>
  );
};

export default Burger;