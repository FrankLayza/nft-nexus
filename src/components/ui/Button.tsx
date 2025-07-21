interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const Button = ({children, className="", onClick, type="button"}: ButtonProps) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`btn transition-all duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
