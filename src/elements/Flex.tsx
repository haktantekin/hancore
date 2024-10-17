import React from 'react';
import { FlexProps } from 'types/type';

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, gap, ...props }, ref) => {
    const {
      direction = 'row',
      justifyContent = 'flex-start',
      alignItems = 'flex-start',
      flexWrap = 'nowrap',
      style,
      ...rest
    } = props;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      justifyContent,
      alignItems,
      flexWrap,
      gap,
      ...style,
    };

    return (
      <div ref={ref} className={className} style={containerStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;

