import React from "react";
import { ScrollAreaProps } from "types/type";

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  className,
  style,
  horizontal = false,
  vertical = true,
  onScroll,
}) => {
  return (
    <div
      className={`overflow-${horizontal ? "x" : "y"} ${vertical ? "overflow-y-auto" : ""} ${className}`}
      style={style}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
