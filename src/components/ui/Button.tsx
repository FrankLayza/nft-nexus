import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    className = "", 
    onClick, 
    type = "button" 
}) => {
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
