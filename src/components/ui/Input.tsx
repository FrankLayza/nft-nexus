type InputProps = {
  type?: string;
  className?: string;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = ({type="text", className, placeholder="Search NFT, Collections", ...props}: InputProps) => {
    return (  
        <input type={type} placeholder={placeholder} className={`w-full input input-bordered ${className}`} {...props} />
    );
}
 
export default Input;