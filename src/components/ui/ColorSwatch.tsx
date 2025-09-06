interface ColorSwatchProps {
  color: string;
  currentColor?: string | null;
  setCurrentColor?: (color: string) => void;
  children?: React.ReactNode;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  currentColor,
  setCurrentColor,
  children,
  className,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      style={{ backgroundColor: color }}
      className={`w-6 h-6 rounded-full  hover:opacity-80 ${
        color === currentColor ? "border-2 border-gray-500" : ""
      } focus:outline-blue-500 ${
        color === "white" ? "border border-gray-200" : ""
      } ${className}`}
      onClick={() => setCurrentColor && setCurrentColor(color)}
    >
      {children}
    </div>
  );
};

export default ColorSwatch;
