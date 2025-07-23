type SkeletonProps = {
  isSearching?: boolean;
}

const SkeletonLoader = ({isSearching=false}: SkeletonProps) => {
    return ( 
        <div className={`card bg-base-100 border border-gray-200 animate-pulse ${isSearching ? "block" : "hidden"}`}>
          <figure className="bg-gray-200 h-48 w-full" />
          <div className="px-4 py-2 space-y-2">
            <div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="py-2 space-y-1">
              <div className="flex justify-between items-center text-xs">
                <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between items-center text-xl">
                <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
                <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
                <div className="h-3 w-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default SkeletonLoader;