import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { TooltipProps } from 'types/type';

const Tooltip: React.FC<TooltipProps> = ({
  children,
  label,
  position = 'top',
  withArrow = false,
  opened,
  disabled = false,
  offset = 5,
  transition = 'fade',
  transitionDuration = 100,
  multiline = false,
  width = 'auto',
  color = 'dark',
  radius = 'sm',
  withinPortal = true,
  inline = false,
  closeDelay = 0,
  openDelay = 0,
  zIndex,
  gutter = 5,
  arrowSize = 4,
  arrowOffset = 5,
  arrowRadius = 0,
  events = { hover: true, focus: false, touch: false },
  keepMounted = false,
  positionDependencies = [],
  clickOutsideEvents = ['mousedown', 'touchstart'],
  id,
  initialize = true,
  ...others
}) => {
  const [isVisible, setIsVisible] = useState(opened);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (opened !== undefined) {
      setIsVisible(opened);
    }
  }, [opened]);

  useEffect(() => {
    if (initialize && !disabled) {
      setIsVisible(true);
    }
  }, [initialize, disabled]);

  const handleClickOutside = useCallback((event: MouseEvent | TouchEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
      hideTooltip();
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      clickOutsideEvents.forEach(event => {
        if (event === 'mousedown') {
          document.addEventListener('mousedown', handleClickOutside as (event: MouseEvent) => void);
        } else if (event === 'touchstart') {
          document.addEventListener('touchstart', handleClickOutside as (event: TouchEvent) => void);
        }
      });
    }

    return () => {
      clickOutsideEvents.forEach(event => {
        if (event === 'mousedown') {
          document.removeEventListener('mousedown', handleClickOutside as (event: MouseEvent) => void);
        } else if (event === 'touchstart') {
          document.removeEventListener('touchstart', handleClickOutside as (event: TouchEvent) => void);
        }
      });
    };
  }, [isVisible, clickOutsideEvents, handleClickOutside]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, ...positionDependencies]);

  const showTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), openDelay);
  };

  const hideTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), closeDelay);
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - offset - gutter;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + offset + gutter;
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left - tooltipRect.width - offset - gutter;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + offset + gutter;
        break;
    }

    tooltipRef.current.style.top = `${top}px`;
    tooltipRef.current.style.left = `${left}px`;
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: zIndex || 1000,
    opacity: isVisible ? 1 : 0,
    transition: `opacity ${transitionDuration}ms ${transition}`,
    backgroundColor: color === 'dark' ? '#333' : '#fff',
    color: color === 'dark' ? '#fff' : '#333',
    padding: '0.5rem 1rem',
    borderRadius: radius === 'sm' ? '0.25rem' : radius === 'md' ? '0.5rem' : '1rem',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    maxWidth: width === 'auto' ? 'none' : width,
    whiteSpace: multiline ? 'normal' : 'nowrap',
  };

  const arrowStyle: React.CSSProperties = withArrow ? {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    borderColor: `${color === 'dark' ? '#333' : '#fff'} transparent transparent transparent`,
    borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
    top: position === 'bottom' ? `-${arrowSize}px` : position === 'top' ? '100%' : '50%',
    left: position === 'left' ? '100%' : position === 'right' ? `-${arrowSize}px` : '50%',
    transform: `translateX(-50%) ${position === 'left' || position === 'right' ? 'translateY(-50%) rotate(-90deg)' : ''}`,
    marginLeft: arrowOffset,
    borderRadius: `${arrowRadius}px`,
  } : {};

  const tooltipContent = (
    <div ref={tooltipRef} style={tooltipStyle} id={id} {...others}>
      {label}
      {withArrow && <div style={arrowStyle} />}
    </div>
  );

  const eventHandlers = {
    ...(events.hover && { onMouseEnter: showTooltip, onMouseLeave: hideTooltip }),
    ...(events.focus && { onFocus: showTooltip, onBlur: hideTooltip }),
    ...(events.touch && { onTouchStart: showTooltip, onTouchEnd: hideTooltip }),
  };

  return (
    <div
      ref={triggerRef}
      style={{ display: inline ? 'inline-block' : 'block' }}
      {...eventHandlers}
    >
      {children}
      {(isVisible || keepMounted) && (withinPortal ? createPortal(tooltipContent, document.body) : tooltipContent)}
    </div>
  );
};

export default Tooltip;