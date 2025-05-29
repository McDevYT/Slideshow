import "./IconButton.css";

interface IconButtonProps {
  onClick?: () => void;
  icon: React.ReactElement;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, color }) => {
  return (
    <button
      style={{ backgroundColor: color }}
      className="iconButton"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
