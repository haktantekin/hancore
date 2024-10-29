// Progress.tsx
import React from "react";
import { ProgressProps } from "types/type";

const radiusClasses = {
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const sizeClasses = {
  xs: "h-1",
  sm: "h-2",
  md: "h-4",
  lg: "h-6",
  xl: "h-8",
};

const colorClasses = {
  blue: "bg-blue-500",
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  gray: "bg-gray-500",
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  color = "blue",
  radius = "md",
  size = "md",
  striped = false,
  animate = false,
  className,
  style,
}) => {
  const progressClass = `
    ${colorClasses[color]} 
    ${radiusClasses[radius]} 
    ${sizeClasses[size]}
    ${striped ? "bg-stripes" : ""}
    ${animate ? "animate-progress" : ""}
  `;

  return (
    <div className={`w-full bg-gray-200 ${radiusClasses[radius]} ${sizeClasses[size]} ${className ?? ""}`} style={style}>
      <div
        className={`${progressClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;
