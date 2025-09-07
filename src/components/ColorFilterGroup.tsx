import React from "react";
import ColorSwatch from "./ui/ColorSwatch";

interface ColorFilterGroupProps {
  colors: string[];
  selectedColors: string[];
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: "colors"
  ) => void;
}

const ColorFilterGroup: React.FC<ColorFilterGroupProps> = ({
  colors,
  selectedColors,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-col py-4 border-b border-b-neutral-200">
      <h4 className="font-bold text-sm mb-2">Colors:</h4>
      <div className="flex flex-wrap gap-1">
        {colors.map((color) => (
          <label htmlFor={`color-${color}`} key={color}>
            <input
              id={`color-${color}`}
              type="checkbox"
              name="color"
              value={color}
              checked={selectedColors.includes(color as string)}
              onChange={(e) => onFilterChange(e, "colors")}
              className="hidden peer"
            />
            <ColorSwatch
              color={color}
              className={`p-1 peer-checked:ring-gray-500 peer-checked:ring-2 focus:ring-2 focus:ring-blue-500`}
            />
            <span className="ml-2 capitalize sr-only">{color}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilterGroup;
