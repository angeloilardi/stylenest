interface IProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Button = ({ icon, onClick, children, className }: IProps) => {
  return (
    <button
      className={`border border-neutral-200 p-2 flex items-center justify-center gap-2 rounded-md ${className}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
