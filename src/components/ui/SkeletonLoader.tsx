type SkeletonProps = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SkeletonLoader = ({className="", ...props}: SkeletonProps) => {
    return ( 
        <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 ${className}`} {...props}></div>
        </>
     );
}
 
export default SkeletonLoader;