type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

const Badge = ({ children, className = "" }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className}`}>{children}</span>
  );
};
 
export default Badge;