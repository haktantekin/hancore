import React from 'react';
import { GroupProps } from 'types/type';

const Group: React.FC<GroupProps> = ({
  children,
  position = 'left',
  noWrap = false,
  grow = false,
  spacing = 'md',
  align = 'center',
  preventGrowOverflow = false,
  wrap = 'wrap',
  justify = 'flex-start',
  gap,
  style,
  className,
  ...others
}) => {
  const getPositionClass = () => {
    switch (position) {
      case 'right':
        return 'justify-end';
      case 'center':
        return 'justify-center';
      case 'apart':
        return 'justify-between';
      default:
        return 'justify-start';
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case 'stretch':
        return 'items-stretch';
      case 'start':
        return 'items-start';
      case 'end':
        return 'items-end';
      default:
        return 'items-center';
    }
  };

  const getSpacingClass = () => {
    if (gap !== undefined) return '';
    switch (spacing) {
      case 'xs': return 'space-x-1';
      case 'sm': return 'space-x-2';
      case 'md': return 'space-x-4';
      case 'lg': return 'space-x-6';
      case 'xl': return 'space-x-8';
      default: return typeof spacing === 'number' ? `space-x-[${spacing}px]` : 'space-x-4';
    }
  };

  const getWrapClass = () => {
    if (noWrap) return 'flex-nowrap';
    switch (wrap) {
      case 'nowrap':
        return 'flex-nowrap';
      case 'wrap-reverse':
        return 'flex-wrap-reverse';
      default:
        return 'flex-wrap';
    }
  };

  const groupClass = `
    flex
    ${getPositionClass()}
    ${getAlignClass()}
    ${getSpacingClass()}
    ${getWrapClass()}
    ${grow ? 'grow' : ''}
    ${preventGrowOverflow ? 'overflow-hidden' : ''}
    ${className || ''}
  `.trim();

  const groupStyle: React.CSSProperties = {
    gap: gap ?? undefined,
    justifyContent: justify ?? 'flex-start',
    ...style
  };

  return (
    <div className={groupClass} style={groupStyle} {...others}>
      {children}
    </div>
  );
};

export default Group;