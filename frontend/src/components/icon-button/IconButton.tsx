import "./IconButton.css";

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactElement;
  color?: string;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  color,
  className,
}) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className={`iconButton ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
