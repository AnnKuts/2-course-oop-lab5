interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
                                         children,
                                         onClick,
                                         onMouseEnter,
                                         type = 'button',
                                         className = ''
                                       }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;