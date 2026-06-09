import { Truck } from "lucide-react";
import useCheckout from "./CheckoutLogic";

function OrderSummary() {
    const {subtotal, cartItems, total, shipping,} = useCheckout();
    return (
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6 sticky top-28">
            <h2 className="font-extrabold text-slate-800 text-lg uppercase border-b border-slate-100 pb-4 text-left">Your Order</h2>
            {/* Items list */}
            {cartItems.map((item) => {
                return(
                    <div key={item.id} className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-1">
                        <div className="flex gap-4 items-center justify-between py-2 border-b border-slate-50">
                            <div className="flex gap-3 items-center">
                                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0 relative">
                                    <img src={item.image} className="max-w-full max-h-full"/>
                                    <span className="absolute -top-2 -right-2.5 w-4 h-4 font-extrabold text-[8px] flex justify-center items-center">{item.quantity}X</span>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 text-sm uppercase">{item.brand} {item.category?.replaceAll("-", " ")}</h4>
                                    <p className="text-slate-400 text-xs font-semibold mt-0.5">{item.flavor}</p>
                                </div>
                            </div>
                            <span className="font-bold text-slate-800 text-sm">{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    </div>
            )})}
            <hr className="border-slate-100" />
            {/* Pricing details */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-bold">{subtotal}EGP</span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Shipping Fee</span>
                    {shipping > 0 ? <span className="text-slate-800 font-bold">{shipping}EGP</span> : <span className="font-bold uppercase text-xs text-emerald-500">FREE</span>}
                </div>
                {shipping > 0 && (
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                        * Add <span className="font-bold text-maincolor">{(1500 - subtotal).toLocaleString()} EGP</span> more to get FREE shipping!
                    </p>
                )}
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-1">
                    <div className="flex items-center gap-1.5 text-slate-650">
                        <Truck size={14} className="text-maincolor" />
                        <span>Estimated Delivery</span>
                    </div>
                    <span className="text-slate-800 font-bold">2-3 Business Days</span>
                </div>
            </div>
            <hr className="border-slate-100" />
            <div className="flex justify-between items-baseline mb-2">
                <span className="text-sm font-bold text-slate-800 uppercase">Total Amount</span>
                <div className="text-right">
                    <span className="text-xl font-black text-maincolor">{total.toLocaleString()}</span>
                    <span className="text-xs font-bold text-maincolor ml-1">EGP</span>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary