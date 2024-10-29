// Modal.tsx
import React from "react";
import { ModalProps } from "types/type";

const sizeClasses = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const radiusClasses = {
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  title,
  children,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  overlayOpacity = 0.5,
  overlayBlur = 0,
  size = "md",
  radius = "md",
  centered = false,
  className,
  style,
  withCloseButton = true,
}) => {
  if (!opened) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${centered ? "items-center justify-center" : "items-start justify-center pt-10"}`}
      style={{
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        backdropFilter: overlayBlur ? `blur(${overlayBlur}px)` : undefined,
      }}
    >
      <div
        className={`bg-white p-6 ${sizeClasses[size]} ${radiusClasses[radius]} shadow-lg ${className ?? ""}`}
        style={style}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {withCloseButton && (
            <button
              onClick={onClose}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
