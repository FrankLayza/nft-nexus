type ProgressProps = {
  value?: string;
  max?: string;
  className?: string;
}

const Progress = ({value="10", max="100", className}: ProgressProps) => {
    return (  
        <progress className={`progress w-full ${className}`} value={value} max={max}></progress>
    );
}
 
export default Progress;