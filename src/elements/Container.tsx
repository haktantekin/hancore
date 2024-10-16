import React, { FC } from 'react';
import { ContainerProps } from 'types/type';

const Container: FC<ContainerProps> = ({ width = 'desktop', className, children }) => {
  const getContainerWidth = () => {
    let containerWidth = '';
    if (typeof width === 'number') {
      containerWidth = `max-w-[${width}px] w-[95%] mx-auto`;
    } else {
      switch (width) {
        case 'mobile':
          containerWidth = 'w-[90%] mx-auto';
          break;
        case 'tablet':
          containerWidth = 'w-[95%] mx-auto';
          break;
        case 'desktop':
        default:
          containerWidth = 'max-w-[1200px] w-[95%] mx-auto';
          break;
      }
    }

    return `${containerWidth} px-4 py-8 ${className ?? ''}`;
  };

  return (
    <div className={getContainerWidth()}>
      {children}
    </div>
  );
};

export default Container;