type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset";
}& React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children, className="", type="button", ...props}: ButtonProps) => {
    return (
        <button 
            type={type} 
            className={`btn transition-all duration-300 ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
