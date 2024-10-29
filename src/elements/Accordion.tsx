// Accordion.tsx
import React, { useState } from "react";
import { AccordionProps } from "types/type";

const Accordion: React.FC<AccordionProps> = ({ items, multiple = false, className, style }) => {
  const [openedItems, setOpenedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (multiple) {
      setOpenedItems((prev) => {
        if (prev.includes(index)) {
          return prev.filter((item) => item !== index);
        } else {
          return [...prev, index];
        }
      });
    } else {
      setOpenedItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`border border-gray-300 rounded ${className ?? ""}`} style={style}>
      {items.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => toggleItem(index)}
            className="flex justify-between w-full p-4 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            {item.label}
            <span>{openedItems.includes(index) ? "-" : "+"}</span>
          </button>
          {openedItems.includes(index) && (
            <div className="p-4 border-t border-gray-300">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
