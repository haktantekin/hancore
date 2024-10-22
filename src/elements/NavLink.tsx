import React, { forwardRef } from 'react';
import { NavLinkProps } from 'types/type';

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((
  {
    children,
    label,
    description,
    icon,
    rightSection,
    active = false,
    variant = 'light',
    color = 'blue',
    disabled = false,
    onClick,
    href,
    classNames,
    styles,
    noWrap = false,
    className,
    style,
    ...others
  }, ref) => {

  const getVariantStyles = () => {
    const baseStyle = 'block relative transition-colors duration-150 ease-in-out';
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const wrapStyle = noWrap ? 'whitespace-nowrap' : 'whitespace-normal';

    switch (variant) {
      case 'light':
        return `${baseStyle} ${disabledStyle} ${wrapStyle} p-3 ${
          active ? `bg-${color}-50 text-${color}-600` : 'hover:bg-gray-50'
        }`;
      case 'filled':
        return `${baseStyle} ${disabledStyle} ${wrapStyle} p-3 ${
          active ? `bg-${color}-500 text-white` : 'hover:bg-gray-50'
        }`;
      case 'subtle':
        return `${baseStyle} ${disabledStyle} ${wrapStyle} p-3 ${
          active ? `text-${color}-600` : 'hover:bg-gray-50'
        }`;
      default:
        return `${baseStyle} ${disabledStyle} ${wrapStyle} p-3 hover:bg-gray-50`;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={`
        ${getVariantStyles()}
        ${className ?? ''}
        ${classNames?.root ?? ''}
      `.trim()}
      style={{ ...style, ...styles?.root }}
      {...others}
    >
      <div className="flex items-center">
        {icon && (
          <div className={`${classNames?.icon ?? ''} mr-3`} style={styles?.icon}>
            {icon}
          </div>
        )}
        <div className="flex-grow min-w-0">
          {label && (
            <div 
              className={`text-sm font-medium ${classNames?.label ?? ''}`}
              style={styles?.label}
            >
              {label}
            </div>
          )}
          {description && (
            <div 
              className={`text-xs text-gray-500 ${classNames?.description ?? ''}`}
              style={styles?.description}
            >
              {description}
            </div>
          )}
          {children}
        </div>
        {rightSection && (
          <div 
            className={`ml-3 ${classNames?.rightSection ?? ''}`}
            style={styles?.rightSection}
          >
            {rightSection}
          </div>
        )}
      </div>
    </a>
  );
});

NavLink.displayName = 'NavLink';

export default NavLink;