import { FaCheck } from "react-icons/fa6";

interface ColorSwatchProps {
  color: string;
  currentColor?: string | null;
  setCurrentColor?: (color: string) => void;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  currentColor,
  setCurrentColor,
  className,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      style={{ backgroundColor: color }}
      className={`w-6 h-6 flex items-center justify-center rounded-full  hover:opacity-80 ${
        color === currentColor ? "border-2 border-gray-500" : ""
      } focus:outline-blue-500 ${
        color === "white" ? "border border-gray-200" : ""
      } ${className}`}
      onClick={() => setCurrentColor && setCurrentColor(color)}
    >
      {color === currentColor && <FaCheck className="w-8 h-8 text-white" />}
    </div>
  );
};

export default ColorSwatch;
