import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { addToCart, decreaseQuantity, removeFromCart } from "../features/cartLogic/cartSlice";

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    // Calculate subtotal dynamically
    const subtotal = cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
    const shipping = subtotal > 1500 ? 0 : 50; // Free shipping over 1500 EGP
    const total = subtotal + (subtotal > 0 ? shipping : 0);
    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20 font-montserrat">
            <div className="container">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight uppercase">Your Shopping Cart</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your premium items and proceed to checkout</p>
                    </div>
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-maincolor hover:text-maincolor/80 transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-3xl border border-slate-100 shadow-sm text-center max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-maincolor mb-6 animate-bounce">
                            <ShoppingBag size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 uppercase">Your Cart is Empty</h2>
                        <p className="text-slate-500 mt-2 max-w-sm">Looks like you haven't added any premium supplements to your cart yet.</p>
                        <Link to="/" className="bg-maincolor text-white px-8 py-3.5 rounded-xl font-bold mt-8 shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    /* Cart Content */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 items-center">
                                    {/* Product Image Frame */}
                                    <div className="w-24 h-24 bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                                        <img src={item.image} alt={item.brand} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    {/* Product Details */}
                                    <div className="flex flex-col flex-grow text-center sm:text-left">
                                        <h3 className="font-extrabold text-slate-800 text-lg uppercase leading-snug line-clamp-1">{item.brand}</h3>
                                        <p className="text-slate-400 text-sm font-semibold capitalize mt-0.5">{item.flavor || "Default Flavor"}</p>
                                        <div className="flex items-center justify-center sm:justify-start gap-1 text-maincolor font-bold text-sm mt-2">
                                            <span>{item.price}</span>
                                            <span className="text-xs">EGP</span>
                                        </div>
                                    </div>
                                    {/* Action Section (Quantity & Delete) */}
                                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-6 sm:gap-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1 font-bold">
                                            <button 
                                                onClick={() => dispatch(decreaseQuantity({ id: item.id }))} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-maincolor transition-all shadow-sm cursor-pointer disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-10 text-center text-slate-800 text-sm">{item.quantity}</span>
                                            <button 
                                                onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))} 
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-white hover:text-maincolor transition-all shadow-sm cursor-pointer"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        {/* Price & Delete Button */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right hidden sm:block">
                                                <span className="text-xs text-slate-400 font-semibold block">Subtotal</span>
                                                <span className="font-extrabold text-slate-800 text-base">
                                                    {(item.price * item.quantity).toLocaleString()} EGP
                                                </span>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-rose-200 hover:shadow-lg cursor-pointer"
                                                title="Remove item"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Order Summary Side Panel */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 sticky top-28">
                            <h2 className="font-extrabold text-slate-800 text-lg uppercase border-b border-slate-100 pb-4">Order Summary</h2>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between text-sm font-semibold text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="text-slate-800 font-bold">{subtotal.toLocaleString()} EGP</span>
                                </div>
                                <div className="flex justify-between text-sm font-semibold text-slate-500">
                                    <span>Shipping</span>
                                    <span className="text-slate-800 font-bold">
                                        {shipping === 0 ? <span className="text-emerald-500 font-bold uppercase text-xs bg-emerald-50 px-2 py-0.5 rounded-md">Free</span> : `${shipping} EGP`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                                        * Add <span className="font-bold text-maincolor">{(1500 - subtotal).toLocaleString()} EGP</span> more to get FREE shipping!
                                    </p>
                                )}
                            </div>
                            <hr className="border-slate-100" />
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-base font-bold text-slate-800 uppercase">Total</span>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-maincolor">{total.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-maincolor ml-1">EGP</span>
                                </div>
                            </div>
                            {/* Checkout CTA */}
                            <Link to="/checkout" className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-2 text-center text-sm block">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;