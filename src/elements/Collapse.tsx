// Collapse.tsx
import React from "react";
import { CollapseProps } from "types/type";

const Collapse: React.FC<CollapseProps> = ({ children, isOpen, className, style, onToggle }) => {
  return (
    <div className={className} style={style}>
      <button onClick={onToggle} className="mb-2 text-blue-600">
        {isOpen ? "Kapat" : "Aç"}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
