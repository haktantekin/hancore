// Drawer.tsx
import React from "react";
import { DrawerProps } from "types/type";

const Drawer: React.FC<DrawerProps> = ({
  opened,
  onClose,
  position = "right",
  size = "300px",
  overlayColor = "rgba(0, 0, 0, 0.5)",
  overlayOpacity = 0.5,
  overlayBlur = 0,
  children,
  className,
  style,
  withCloseButton = true,
}) => {
  if (!opened) return null;

  const positionClasses = {
    left: "inset-y-0 left-0",
    right: "inset-y-0 right-0",
    top: "inset-x-0 top-0",
    bottom: "inset-x-0 bottom-0",
  };

  const positionSizeStyles = {
    left: { width: size, height: "100%" },
    right: { width: size, height: "100%" },
    top: { height: size, width: "100%" },
    bottom: { height: size, width: "100%" },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{
        backgroundColor: overlayColor,
        opacity: overlayOpacity,
        backdropFilter: overlayBlur ? `blur(${overlayBlur}px)` : undefined,
      }}
    >
      <div
        className={`fixed bg-white shadow-lg p-6 ${positionClasses[position]} ${className || ""}`}
        style={{ ...positionSizeStyles[position], ...style }}
      >
        {withCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
