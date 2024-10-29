// HoverCard.tsx
import React, { useState } from "react";
import { HoverCardProps } from "types/type";

const radiusClasses = {
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const shadowClasses = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const positionClasses = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
};

export const HoverCard: React.FC<HoverCardProps> = ({
  children,
  content,
  position = "top",
  radius = "md",
  shadow = "md",
  withArrow = false,
  className,
  style,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
    role="button"
    tabIndex={0}
    className="relative inline-block"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onFocus={() => setIsHovered(true)}
    onBlur={() => setIsHovered(false)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        setIsHovered(true);
      }
    }}
    onTouchStart={() => setIsHovered(true)}
    onTouchEnd={() => setIsHovered(false)}
  >
      {children}
      {isHovered && (
        <div
          className={`absolute z-10 p-4 bg-white ${radiusClasses[radius]} ${shadowClasses[shadow]} ${positionClasses[position]} ${className ?? ""}`}
          style={style}
        >
          {withArrow && (
            <div
              className={`absolute w-3 h-3 bg-white transform rotate-45 ${position === "top"
                  ? "bottom-[-5px] left-1/2 transform -translate-x-1/2"
                  : position === "right"
                    ? "left-[-5px] top-1/2 transform -translate-y-1/2"
                    : position === "bottom"
                      ? "top-[-5px] left-1/2 transform -translate-x-1/2"
                      : "right-[-5px] top-1/2 transform -translate-y-1/2"
                } ${shadowClasses[shadow]}`}
            />
          )}
          {content}
        </div>
      )}
    </div>
  );
};

export default HoverCard;
