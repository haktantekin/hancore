import React from 'react';
import { SimpleGridProps } from 'types/type';

const SimpleGrid: React.FC<SimpleGridProps> = ({
  children,
  cols = 1,
  spacing = 'md',
  verticalSpacing,
  breakpoints,
  style,
  ...rest
}) => {
  const [gridCols, setGridCols] = React.useState(cols);

  React.useEffect(() => {
    const handleResize = () => {
      if (breakpoints) {
        const sortedBreakpoints = [...breakpoints].sort((a, b) => b.maxWidth - a.maxWidth);
        const activeBreakpoint = sortedBreakpoints.find(bp => window.innerWidth <= bp.maxWidth);
        setGridCols(activeBreakpoint ? activeBreakpoint.cols : cols);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints, cols]);

  const getSpacing = (size: string | number) => {
    if (typeof size === 'number') return `${size}px`;
    switch (size) {
      case 'xs': return '0.25rem';
      case 'sm': return '0.5rem';
      case 'md': return '1rem';
      case 'lg': return '1.5rem';
      case 'xl': return '2rem';
      default: return '1rem';
    }
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gap: getSpacing(verticalSpacing || spacing),
    ...style,
  };

  return (
    <div style={gridStyle} {...rest}>
      {children}
    </div>
  );
};

export default SimpleGrid;