import { CheckCircle2, Clock, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        async function getOrders() {
            try{
                setLoading(true);
                const {data, error} = await supabase.from("orders").select("*");
                if(error) throw error;
                setOrders(data);
            } catch(error){
                toast.error(
                    <div>{error.message || "Something Went Wrong"}</div>,
                    {duration: 3000}
                )
            } finally{
                setLoading(false);
            }
        }
        getOrders();
    },[]);
    return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
        {/* Header */}
        <div>
            <h2 className="font-extrabold text-slate-800 text-lg uppercase pb-1">Order History</h2>
            <p className="text-slate-400 text-xs font-semibold">Track and view your recent supplement store orders status</p>
        </div>
        <hr className="border-slate-100" />
        {/* Orders */}
        <div className="flex flex-col gap-4">
            {loading ? (
                <div className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0 animate-pulse"></div>
                        <div>
                            <span className="w-10 h-2 animate-pulse bg-slate-200 block rounded-xl"></span>
                            <h4 className="w-50 h-5 animate-pulse bg-slate-200 rounded-xl mt-2"></h4>
                            <span className="w-30 h-3 animate-pulse bg-slate-200 rounded-xl mt-2 block"></span>
                        </div>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 gap-4 py-12 animate-fade-in">
                    <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="font-extrabold text-slate-700 text-sm uppercase">No Orders Found</h4>
                        <p className="text-slate-400 text-xs font-semibold max-w-xs leading-relaxed">
                            You haven't placed any supplement store orders yet. Check out our store and get your first order!
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-maincolor text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase shadow-md shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2 mt-2"
                    >
                        <span>Start Shopping</span>
                    </button>
                </div>
            ) : (
                <>
                    {orders.map((order) => {
                        return(
                            <div key={order.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border border-slate-100 rounded-xl bg-slate-50 gap-4 hover:shadow-sm transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {order.status === "pending" ? <div className="w-10 h-10 bg-white border border-slate-150 text-blue-500 rounded-xl flex items-center justify-center shrink-0"><Clock size={18}/></div> : <div className="w-10 h-10 bg-white border border-slate-150 text-emerald-500 rounded-xl flex items-center justify-center shrink-0"><CheckCircle2 size={18} /></div>}
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{`ORD-${order.id}`}</span>
                                        <h4 className="font-bold text-slate-700 text-sm mt-0.5 uppercase">{order.order_items[0].category?.replaceAll("-", " ")}{order.order_items.length > 1 && "..."}</h4>
                                        <span className="text-slate-500 text-xs font-semibold block mt-0.5">{order.total_price?.toLocaleString()} EGP</span>
                                    </div>
                                </div>
                                <span className={`border ${order.status === "pending" ? 'border-blue-100 text-blue-600 bg-blue-100' : 'border-emerald-100 text-emerald-600 bg-emerald-50'} text-[10px] font-bold uppercase px-3 py-1 rounded-md self-start sm:self-auto`}>
                                    {order.status}
                                </span>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    </div>
    )
}

export default Orders