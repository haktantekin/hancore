// Notification.tsx
import React from "react";
import { NotificationProps } from "types/type";

export const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  color = "blue",
  radius = "md",
  icon,
  onClose,
  loading = false,
  disallowClose = false,
  closeButtonProps,
  className,
  style,
  withCloseButton = true,
  variant = "filled",
}) => {
  // Radius sınıflarını seç
  const radiusClass = radius === "xs" 
    ? "rounded-sm" 
    : radius === "sm" 
    ? "rounded" 
    : radius === "lg" 
    ? "rounded-lg" 
    : radius === "xl" 
    ? "rounded-xl" 
    : "rounded-md";

  // Renk ve varyant sınıflarını seç
  const variantClass = variant === "filled"
    ? color === "blue"
      ? "bg-blue-500 text-white"
      : color === "red"
      ? "bg-red-500 text-white"
      : color === "green"
      ? "bg-green-500 text-white"
      : color === "yellow"
      ? "bg-yellow-500 text-black"
      : "bg-gray-500 text-white"
    : variant === "outline"
    ? color === "blue"
      ? "border border-blue-500 text-blue-500"
      : color === "red"
      ? "border border-red-500 text-red-500"
      : color === "green"
      ? "border border-green-500 text-green-500"
      : color === "yellow"
      ? "border border-yellow-500 text-yellow-500"
      : "border border-gray-500 text-gray-500"
    : color === "blue"
    ? "bg-blue-100 text-blue-800"
    : color === "red"
    ? "bg-red-100 text-red-800"
    : color === "green"
    ? "bg-green-100 text-green-800"
    : color === "yellow"
    ? "bg-yellow-100 text-yellow-800"
    : "bg-gray-100 text-gray-800";

  return (
    <div
      className={`p-4 flex items-start gap-4 ${radiusClass} ${variantClass} ${className ?? ""}`}
      style={style}
    >
      {loading ? (
        <div className="animate-spin border-4 border-t-transparent border-white rounded-full w-6 h-6" />
      ) : (
        icon && <div className="flex-shrink-0">{icon}</div>
      )}

      <div className="flex-1">
        {title && <div className="font-semibold">{title}</div>}
        <div>{message}</div>
      </div>

      {withCloseButton && !disallowClose && (
        <button
          className="text-white bg-transparent ml-auto"
          onClick={onClose}
          {...closeButtonProps}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;
