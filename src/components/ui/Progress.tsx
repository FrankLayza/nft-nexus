import React from "react";

type ProgressProps = {
  value?: string;
  max?: string;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
    value,
    max,
    className
}) => {
    return (  
        <progress className={`progress w-full ${className}`} value={value} max={max}></progress>
    );
}
 
export default Progress;