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
            className={`px-4 py-2 rounded-md font-medium hover:bg-accent active:bg-accent hover:text-accent-content active:text-accent-content transition-colors duration-300 cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
