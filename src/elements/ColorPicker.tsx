import React, { useState, useEffect, useCallback } from 'react';
import { ColorPickerColor, ColorPickerProps } from 'types/type';

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  swatches,
  withPicker = true,
  fullWidth = false,
  size = 'sm',
  focusable = true,
  swatchesPerRow = 10,
  onChangeEnd,
  disabled = false,
  ...rest
}) => {
  const [currentColor, setCurrentColor] = useState<ColorPickerColor>(value || '#ffffff');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setCurrentColor(value);
    }
  }, [value]);

  const handleColorChange = useCallback((newColor: ColorPickerColor) => {
    setCurrentColor(newColor);
    onChange?.(newColor);
  }, [onChange]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    handleColorSelection(event);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleColorSelection(event);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onChangeEnd?.(currentColor);
  };

  const handleColorSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    const hue = x * 360;
    const saturation = y * 100;
    const lightness = 50;

    const newColor = hslToHex(hue, saturation, lightness);
    handleColorChange(newColor);
  };

  const handleSwatchClick = (color: ColorPickerColor) => {
    handleColorChange(color);
  };

  const hslToHex = (h: number, s: number, l: number): ColorPickerColor => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getSizeClass = (): string => {
    switch (size) {
      case 'xs': return 'w-48 h-48';
      case 'sm': return 'w-64 h-64';
      case 'md': return 'w-80 h-80';
      case 'lg': return 'w-96 h-96';
      case 'xl': return 'w-112 h-112';
      default: return 'w-64 h-64';
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`} {...rest}>
      {withPicker && (
        <div
          role="button"
          className={`${getSizeClass()} relative cursor-crosshair`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          tabIndex={focusable ? 0 : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white to-red-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div
            className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md"
            style={{
              left: `${(parseInt(currentColor.slice(1, 3), 16) / 255) * 100}%`,
              top: `${100 - (parseInt(currentColor.slice(3, 5), 16) / 255) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
      {swatches && (
        <div className={`mt-4 grid gap-2`} style={{ gridTemplateColumns: `repeat(${swatchesPerRow}, minmax(0, 1fr))` }}>
          {swatches.map((swatch: ColorPickerColor, index: number) => (
            <button
              key={index}
              className="w-6 h-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              style={{ backgroundColor: swatch }}
              onClick={() => handleSwatchClick(swatch)}
            />
          ))}
        </div>
      )}
      <div className="mt-4">
        <input
          type="text"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value as ColorPickerColor)}
          className="w-full px-2 py-1 border border-gray-300 rounded"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ColorPicker;