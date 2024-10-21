import React from 'react';
import { BreadcrumbsProps } from 'types/type';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  children,
  separator = '/',
  separatorMargin = 'xs',
  classNames,
  styles,
  ...others
}) => {
  const items = React.Children.toArray(children);

  const getSeparatorMarginClass = () => {
    switch (separatorMargin) {
      case 'xs': return 'mx-1';
      case 'sm': return 'mx-2';
      case 'md': return 'mx-3';
      case 'lg': return 'mx-4';
      case 'xl': return 'mx-5';
      default: return 'mx-2';
    }
  };

  return (
    <div className={`flex items-center ${classNames?.root || ''}`} style={styles?.root} {...others}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span 
              className={`${getSeparatorMarginClass()} ${classNames?.separator || ''}`}
              style={styles?.separator}
            >
              {separator}
            </span>
          )}
          <span className={classNames?.breadcrumb || ''} style={styles?.breadcrumb}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;