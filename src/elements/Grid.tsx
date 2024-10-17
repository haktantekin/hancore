import React from 'react';
import { ColProps, GridProps } from 'types/type';

const createStyles = (cols: number, gap: string | number) => {
  const styles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: gap,
    margin: 0, // gap kullanıldığı için negatif margin'e gerek kalmadı
  };

  return styles;
};

export const Col: React.FC<ColProps> = ({ children, span, offset, style, ...rest }) => {
  const colStyle: React.CSSProperties = {
    flexBasis: span ? `${(span / 12) * 100}%` : '100%',
    maxWidth: span ? `${(span / 12) * 100}%` : '100%',
    marginLeft: offset ? `${(offset / 12) * 100}%` : '0',
    ...style,
  };

  return (
    <div style={colStyle} {...rest}>
      {children}
    </div>
  );
};

const Grid: React.FC<GridProps> = ({
  children,
  cols = 12,
  gap = '1rem',
  style,
  ...rest
}) => {
  const styles = createStyles(cols, gap);

  return (
    <div style={{ ...styles, ...style }} {...rest}>
      {children}
    </div>
  );
};

export default Grid;