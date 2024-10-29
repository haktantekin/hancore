// Timeline.tsx
import React from "react";
import { TimelineProps } from "types/type";

const Timeline: React.FC<TimelineProps> = ({ items, className, style }) => {
  return (
    <div className={`relative ${className}`} style={style}>
      <div className="border-l border-gray-300 pl-4">
        {items.map((item, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-1 mr-2" />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                {item.timestamp && (
                  <span className="text-sm text-gray-500">{item.timestamp}</span>
                )}
              </div>
            </div>
            <div className="mt-1">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
