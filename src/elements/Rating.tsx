import React, { forwardRef, useState, useEffect } from 'react';
import { RatingProps } from 'types/type';

const Rating = forwardRef<HTMLDivElement, RatingProps>(({
  value: propValue,
  onChange,
  onHover,
  size = 'sm',
  count = 5,
  color = 'yellow',
  defaultValue = 0,
  emptySymbol,
  fullSymbol,
  highlightSelectedOnly = false,
  readOnly = false,
  fractions = 1,
  name,
  form,
  id,
  className,
  style,
  ...others
}, ref) => {
  const [value, setValue] = useState(propValue ?? defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue);
    }
  }, [propValue]);

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'md': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      default: return 'text-sm';
    }
  };

  const getColorClass = () => {
    return `text-${color}-500`;
  };

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      const hoverRating = (index + 1) / fractions;
      setHoverValue(hoverRating);
      onHover?.(hoverRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
      onHover?.(0);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly) {
      const newValue = (index + 1) / fractions;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const renderStar = (index: number) => {
    const activeValue = hoverValue !== null ? hoverValue : value;
    const isActive = activeValue > index / fractions;
    const isPartiallyFilled = activeValue > index / fractions && activeValue < (index + 1) / fractions;
    const shouldHighlight = highlightSelectedOnly ? (hoverValue !== null ? hoverValue === index + 1 : value === index + 1) : isActive;

    return (
      <span
        key={index}
        className={`cursor-pointer ${getSizeClass()} ${shouldHighlight ? getColorClass() : 'text-gray-300'}`}
        style={{ position: 'relative' }}
        onMouseEnter={() => handleMouseEnter(index)}
        onClick={() => handleClick(index)}
      >
        <span style={{ display: 'inline-block', overflow: 'hidden', position: 'absolute', left: 0 }}>
          {isPartiallyFilled && (
            <span style={{ width: `${(activeValue - index / fractions) * fractions * 100}%` }}>
              {fullSymbol || '★'}
            </span>
          )}
        </span>
        {isActive ? (fullSymbol || '★') : (emptySymbol || '☆')}
      </span>
    );
  };

  return (
    <div
      ref={ref}
      className={`flex ${className || ''}`}
      style={style}
      onMouseLeave={handleMouseLeave}
      {...others}
    >
      {Array.from({ length: count * fractions }, (_, index) => renderStar(index))}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          form={form}
          id={id}
        />
      )}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;