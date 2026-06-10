import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { Minus, Plus, TruckElectric } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartLogic/cartSlice";
import toast from "react-hot-toast";

function ProductsDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [nutritionPhoto, setNutritionPhoto] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    // Fetch product details from database by id
    useEffect(() => {
        async function getProductDetails() {
            try {
                setLoading(true);
                const { data, error } = await supabase.from("supplements").select("*").eq("id", productId).single();
                if (error) throw error;
                setProduct(data);
                setQuantity(1); // Reset quantity on product change
                setNutritionPhoto(false); // Reset image toggle on product change
            } catch (error) {
                toast.error(
                    <div>{error.message}</div>,
                    {duration:3000}
                )
            } finally {
                setLoading(false);
            }
        }
        getProductDetails();
    }, [productId]);

    // Add product with chosen quantity to cart
    function handleAddToCart(product) {
        dispatch(addToCart({ ...product, quantity: quantity }));
        toast.success(
            <div className="flex gap-4 items-center w-full min-w-[280px]">
                <div className="w-14 h-14 bg-white p-1 rounded-xl border border-slate-200/50 flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                    <img src={product.image} alt={product.brand} className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex flex-col flex-grow text-left">
                    <h4 className="font-bold text-white tracking-wide text-sm font-montserrat line-clamp-1 uppercase leading-snug">{product.brand}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <p className="text-slate-400 text-xs font-semibold normal-case">Added to cart successfully!</p>
                    </div>
                    <Link to={"/cart"} className="inline-flex items-center gap-1 mt-2.5 text-xs font-bold text-[#8dc1e3] hover:text-[#b3daf5] transition-colors duration-200 w-fit group">
                        <span>View Cart</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                </div>
            </div>,
            { duration: 3000 }
        );
    }

    return (
        <section>
            {loading && (
                <div className="container mt-32 sm:mt-40 grid grid-cols-1 gap-6 md:grid-cols-2 px-4 py-6 sm:p-10">
                    <div className="flex justify-center">
                        <div className="h-[300px] w-full max-w-[400px] bg-gray-100 rounded-2xl animate-pulse"></div>
                    </div>
                    <div className="">
                        <p className="bg-gray-100 h-[30px] w-full mb-10 animate-pulse"></p>
                        <p className="bg-gray-100 h-[30px] w-full mb-10 animate-pulse"></p>
                        <p className="bg-gray-100 h-[30px] w-full mb-10 animate-pulse"></p>
                        <p className="bg-gray-100 h-[30px] w-full mb-10 animate-pulse"></p>
                    </div>
                </div>
            )}
            <div className="container mt-32 sm:mt-40 grid grid-cols-1 gap-6 md:grid-cols-2 px-4 py-6 sm:p-10">
                {!loading && (
                    <>
                        {/* Image Viewer */}
                        <div className="flex flex-col items-center gap-3.5">
                            <div className="w-full max-w-[400px] sm:max-w-[500px] aspect-square flex items-center justify-center">
                                <img src={`${!nutritionPhoto ? product.image : product.nutritionImage}`} alt="" className="max-w-full max-h-full object-contain" />
                            </div>
                            {product.nutritionImage && (
                                <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] border-2 border-maincolor rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 flex justify-center items-center">
                                    <img src={`${nutritionPhoto ? product.image : product.nutritionImage}`} alt="" className="max-w-full max-h-full cursor-pointer" onClick={() => setNutritionPhoto(!nutritionPhoto)} />
                                </div>
                            )}
                        </div>
                        {/* Product Info */}
                        <div>
                            <div className="border-b border-maincolor">
                                <h1 className="text-xl sm:text-2xl font-extrabold uppercase italic">{product.brand} - {product.flavor} - {product.category?.replaceAll("-", " ")}</h1>
                                <div className="flex gap-1 items-center mt-2.5 text-maincolor pb-5">
                                    <span className="italic font-bold text-xl">{product.price}</span>
                                    <span className="text-xs italic font-semibold">EGP</span>
                                </div>
                            </div>
                            <div className="details-section-border font-semibold text-sm">
                                <h3 className="flex gap-1.5 items-center">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span> Ready To Ship
                                </h3>
                                <h4 className="flex gap-1.5 items-center"><TruckElectric size={16} /> Shipping All Over Egypt</h4>
                            </div>
                            <div className="details-section-border flex flex-col justify-center">
                                <span className="font-bold uppercase">Quantity</span>
                                <div className="border w-fit p-2.5 flex gap-8 mt-2.5 font-bold items-center">
                                    <span className="cursor-pointer"><Minus size={19} onClick={() => { quantity > 1 && setQuantity(quantity - 1); }} /></span>
                                    <span className="">{quantity}</span>
                                    <span className="cursor-pointer" onClick={() => setQuantity(quantity + 1)}><Plus size={19} /></span>
                                </div>
                                <button className="bg-white border-2 text-maincolor uppercase mt-5.5 py-2 font-bold cursor-pointer rounded-2xl hover:text-white hover:bg-maincolor transition-all duration-300" onClick={() => handleAddToCart(product)}>Add To Cart</button>
                            </div>
                            <div className="details-section-border">
                                <p className="mt-3.5 font-bold leading-9 w-full">{product.description}</p>
                            </div>
                            <div className="flex flex-col gap-6 items-center mt-6">
                                {Object.entries(product.details || {}).map(([key, value]) => {
                                    return (
                                        <div key={key} className="bg-maincolor text-white flex flex-col w-full max-w-[300px] py-3.5 px-7 justify-center items-center rounded-2xl shadow-2xl">
                                            <h1 className="font-extrabold text-xl">{value}</h1>
                                            <h1 className="font-extrabold text-3xl mt-0.5">{key}</h1>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default ProductsDetails;
