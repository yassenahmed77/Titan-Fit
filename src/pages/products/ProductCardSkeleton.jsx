function ProductCardSkeleton() {
    return (
        <div className="border border-gray-100 rounded-2xl p-4 shadow-md overflow-hidden flex flex-col h-full animate-pulse">
            <div className="w-[200px] h-[200px] mx-auto my-6 bg-gray-200 rounded-2xl"></div>
            <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-2"></div>
            <div className="h-5 bg-gray-200 rounded-md w-1/2 mb-4"></div>
            
            <div className="grid grid-cols-4 gap-2 my-5 mt-3">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-200 h-[60px] rounded-xl"></div>
                ))}
            </div>
            
            <div className="mt-auto pt-2 border-t border-gray-100">
                <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-xl w-full mt-4"></div>
            </div>
        </div>
    );
}

export default ProductCardSkeleton;
