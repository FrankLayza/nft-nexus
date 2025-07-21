type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <span className={`... ${className}`}>{children}</span>
  );
};
 
export default Badge;