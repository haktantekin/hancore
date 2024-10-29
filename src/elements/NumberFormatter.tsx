// NumberFormatter.tsx
import React from "react";
import { NumberFormatterProps } from "types/type";

const NumberFormatter: React.FC<NumberFormatterProps> = ({
  value,
  format = { style: "currency", currency: "TRY" },
  locale = "tr-TR",
  className,
  style,
}) => {
  const formattedValue = new Intl.NumberFormat(locale, format).format(Number(value));

  return (
    <span className={className} style={style}>
      {formattedValue}
    </span>
  );
};

export default NumberFormatter;
