import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart} from "../../features/cartLogic/cartSlice";
import toast from "react-hot-toast";
function ProductCard({item}) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const existingProduct = cartItems.find((product) => product.id === item.id);

    function handleAddToCart(item) {
        // adding current item & prev items to redux
        dispatch(addToCart({...item,quantity:1}));
        toast.success(
            <div className="flex gap-4 items-center w-full min-w-[280px]">
                <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.brand} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300"/>
                </div>
                <div className="flex flex-col flex-grow text-left">
                    <h4 className="font-bold text-white tracking-wide text-sm font-montserrat line-clamp-1 uppercase leading-snug">{item.brand}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-slate-400 text-xs font-semibold normal-case">Added to cart successfully!</p>
                    </div>
                    <Link to={"/cart"} className="inline-flex items-center gap-1 mt-2.5 text-xs font-bold text-[#8dc1e3] hover:text-[#b3daf5] transition-colors duration-200 w-fit group">
                        <span>View Cart</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                </div>
            </div>
            ,{duration:2000}
        )
    }

    return (
                <div key={item.id} className="border-1 border-gray-100 rounded-2xl p-4 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
                    {/* Product Details */}
                    <Link to={`/products/${item.id}`} className="flex-grow flex flex-col">
                    {/* Product Image */}
                        <div className="w-[200px] h-[200px] mx-auto my-6 flex items-center justify-center">
                            <img src={item.image} alt="" className="max-w-full max-h-full float-animated object-contain" />
                        </div>
                        {/* Product [Name, Flavor, Macros] */}
                        <h1 className="capitalize font-bold text-xl italic text-maincolor line-clamp-1">{item.category?.replaceAll("-", " ")} {item.brand}</h1>
                        <h2 className="italic text-sm font-semibold my-1 capitalize text-gray-500 line-clamp-1">{item.flavor}</h2>
                        <div className="grid grid-cols-4 gap-2 my-5 mt-3">
                            {Object.entries(item.details).map(([key,value]) => (
                                <div key={key} className="bg-maincolor text-white h-[60px] rounded-xl font-bold capitalize flex flex-col items-center justify-center text-center p-1">
                                    <span className="text-sm">{value}</span>
                                    <span className="text-[9px] leading-tight mt-0.5">{key}</span>
                                </div>
                            ))}
                        </div>
                    </Link>
                    {/* Product Price & Submit */}
                    <div className="mt-auto pt-2 border-t border-gray-100">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center">
                                <span className="italic font-bold text-xl">{item.price}</span>
                                <span className="text-xs italic font-semibold">EGP</span>
                            </div>
                        </div>
                        <button className={`py-3 rounded-xl font-bold w-full mt-4 transition-all duration-300 ${existingProduct ? 'cursor-not-allowed bg-maincolor text-white' : 'bg-transparent text-maincolor border-2 border-maincolor hover:bg-maincolor hover:text-white cursor-pointer'}`} disabled={existingProduct} onClick={() => handleAddToCart(item)}>
                            {`${existingProduct ? 'Added To Cart' : 'Add To Cart'}`}
                        </button>
                    </div>
                </div>
    )
}

export default ProductCard