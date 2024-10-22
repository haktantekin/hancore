import React, { useState, useEffect } from 'react';
import { PaginationProps } from 'types/type';

const Pagination: React.FC<PaginationProps> = ({
  total,
  value,
  onChange,
  defaultValue = 1,
  siblings = 1,
  boundaries = 1,
  withEdges = true,
  withControls = true,
  disabled = false,
  size = 'md',
  radius = 'sm',
  color = 'blue',
  nextLabel = 'Next',
  previousLabel = 'Previous',
  firstLabel = '«',
  lastLabel = '»',
  dotsLabel = '...'
}) => {
  const [currentPage, setCurrentPage] = useState(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentPage(value);
    }
  }, [value]);

  const handlePageChange = (page: number) => {
    if (disabled) return;
    const newPage = Math.min(Math.max(1, page), total);
    setCurrentPage(newPage);
    onChange?.(newPage);
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'h-6 w-6 text-xs';
      case 'sm': return 'h-8 w-8 text-sm';
      case 'md': return 'h-9 w-9 text-base';
      case 'lg': return 'h-10 w-10 text-lg';
      case 'xl': return 'h-12 w-12 text-xl';
      default: return 'h-9 w-9 text-base';
    }
  };

  const getRadiusClass = () => {
    switch (radius) {
      case 'xs': return 'rounded';
      case 'sm': return 'rounded-md';
      case 'md': return 'rounded-lg';
      case 'lg': return 'rounded-xl';
      case 'xl': return 'rounded-2xl';
      default: return 'rounded-md';
    }
  };

  const buttonBaseClass = `
    ${getSizeClass()}
    ${getRadiusClass()}
    flex items-center justify-center
    transition-colors duration-200
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const activeClass = `bg-${color}-500 text-white hover:bg-${color}-600`;
  const inactiveClass = 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300';

  const getRange = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblings * 2 + 3;
    const totalButtons = totalNumbers + 2;

    if (totalButtons >= total) {
      return getRange(1, total);
    }

    const leftIndex = Math.max(currentPage - siblings, boundaries);
    const rightIndex = Math.min(currentPage + siblings, total - boundaries + 1);

    const shouldShowLeftDots = leftIndex > boundaries + 2;
    const shouldShowRightDots = rightIndex < total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      return [...getRange(1, totalNumbers), null, ...getRange(total - boundaries + 1, total)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [...getRange(1, boundaries), null, ...getRange(total - totalNumbers + 1, total)];
    }

    return [
      ...getRange(1, boundaries),
      null,
      ...getRange(leftIndex, rightIndex),
      null,
      ...getRange(total - boundaries + 1, total)
    ];
  };

  return (
    <div className="flex items-center gap-1">
      {withEdges && (
        <button
          type="button"
          className={`${buttonBaseClass} ${inactiveClass}`}
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          aria-label={firstLabel}
        >
          {firstLabel}
        </button>
      )}

      {withControls && (
        <button
          type="button"
          className={`${buttonBaseClass} ${inactiveClass}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label={previousLabel}
        >
          {previousLabel}
        </button>
      )}

      {getPageNumbers().map((pageNumber) => (
        <React.Fragment key={pageNumber}>
          {pageNumber === null ? (
            <span className={`${buttonBaseClass} ${inactiveClass}`}>{dotsLabel}</span>
          ) : (
            <button
              type="button"
              className={`${buttonBaseClass} ${pageNumber === currentPage ? activeClass : inactiveClass}`}
              onClick={() => handlePageChange(pageNumber)}
              disabled={disabled}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          )}
        </React.Fragment>
      ))}

      {withControls && (
        <button
          type="button"
          className={`${buttonBaseClass} ${inactiveClass}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === total}
          aria-label={nextLabel}
        >
          {nextLabel}
        </button>
      )}

      {withEdges && (
        <button
          type="button"
          className={`${buttonBaseClass} ${inactiveClass}`}
          onClick={() => handlePageChange(total)}
          disabled={disabled || currentPage === total}
          aria-label={lastLabel}
        >
          {lastLabel}
        </button>
      )}
    </div>
  );
};

export default Pagination;