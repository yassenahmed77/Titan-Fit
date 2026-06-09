import { ArrowLeft } from "lucide-react";
import OrderSummary from "./OrderSummary";
import CheckoutForm from "./CheckoutForm";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Checkout() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    useEffect(() => {
    if (cartItems.length === 0) {
        navigate("/", { replace: true });
    }
    }, [cartItems, navigate]);
    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20 font-montserrat">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight uppercase">Checkout</h1>
                        <p className="text-slate-500 text-sm mt-1">Complete your order with Cash on Delivery (COD)</p>
                    </div>
                    <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-maincolor hover:text-maincolor/80 transition-colors group">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back to Cart</span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <CheckoutForm/>
                    <OrderSummary/>
                </div>
            </div>
        </section>
    )
}

export default Checkout