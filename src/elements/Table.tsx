// Table.tsx
import React from "react";
import { TableProps } from "types/type";

const Table: React.FC<TableProps> = ({ columns, data, className, style }) => {
  return (
    <table className={`min-w-full border-collapse border border-gray-300 ${className}`} style={style}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border border-gray-300 p-2 bg-gray-100 text-left">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border border-gray-300">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border border-gray-300 p-2">
                {row[column.dataIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
