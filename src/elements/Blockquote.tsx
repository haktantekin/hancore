// Blockquote.tsx
import React from "react";
import { BlockquoteProps } from "types/type";

const Blockquote: React.FC<BlockquoteProps> = ({ children, author, className, style }) => {
  return (
    <blockquote className={`border-l-4 border-gray-500 pl-4 italic ${className}`} style={style}>
      <p>{children}</p>
      {author && <footer className="mt-2 text-right text-sm text-gray-600">— {author}</footer>}
    </blockquote>
  );
};

export default Blockquote;
