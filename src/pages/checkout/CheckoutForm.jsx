import { User, Phone, MapPin, Building, ShieldCheck, CreditCard } from "lucide-react";
import useCheckout from "./CheckoutLogic";

function CheckoutForm() {
    const { formData, handleChange, handleSubmit, loading } = useCheckout();
    return (
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="font-extrabold text-slate-800 text-xl uppercase mb-6 text-left border-b border-slate-100 pb-3">Shipping Details</h2>
            <form className="flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
                {/* Fullname */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="uppercase text-slate-700 text-xs font-bold pl-1">Full Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                            <User size={18} />
                        </span>
                        <input 
                            type="text" 
                            id="name" 
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold" 
                        />
                    </div>
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="uppercase text-slate-700 text-xs font-bold pl-1">Phone Number</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                            <Phone size={18} />
                        </span>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+012 345 678 90" 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold" 
                        />
                    </div>
                </div>
                {/* City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="city" className="uppercase text-slate-700 text-xs font-bold pl-1">City / Governorate</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Building size={18} />
                            </span>
                            <select 
                                id="city" 
                                name="city" 
                            value={formData.city}
                            onChange={handleChange}
                            required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-10 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold appearance-none cursor-pointer"
                            >
                                <option value="Cairo">Cairo</option>
                                <option value="Giza">Giza</option>
                                <option value="Alexandria">Alexandria</option>
                                <option value="Qalyubia">Qalyubia</option>
                                <option value="Gharbia">Gharbia</option>
                                <option value="Dakahlia">Dakahlia</option>
                                <option value="Sharqia">Sharqia</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-450 text-xs">
                                ▼
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="payment" className="uppercase text-slate-700 text-xs font-bold pl-1">Payment Method</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-450">
                                <CreditCard size={18} />
                            </span>
                            <input 
                                type="text" 
                                id="payment" 
                                value="Cash on Delivery (COD)" 
                                readOnly 
                                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none font-bold text-slate-500 cursor-not-allowed" 
                            />
                        </div>
                    </div>
                </div>
                {/* Address */}
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="uppercase text-slate-700 text-xs font-bold pl-1">Detailed Shipping Address</label>
                    <div className="relative">
                        <span className="absolute top-3.5 left-4 text-slate-400">
                            <MapPin size={18} />
                        </span>
                        <textarea 
                            id="address" 
                            name="address" 
                            value={formData.address}
                            onChange={handleChange}
                            required
                            rows={4} 
                            minLength={10}
                            maxLength={200}
                            placeholder="Street name, building number, apartment number, landmark..." 
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold resize-none"
                        ></textarea>
                    </div>
                </div>
                {/* Payment Method */}
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex gap-3 items-start mt-2">
                    <ShieldCheck className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-emerald-800 text-sm uppercase">Secure Cash on Delivery</h4>
                        <p className="text-emerald-600/80 text-xs mt-0.5 leading-relaxed font-semibold">You will pay in cash to the courier upon receiving your package. Ensure your phone number is correct to confirm your order.</p>
                    </div>
                </div>
                {/* Submit */}
                <button 
                    type="submit" 
                    className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-4 text-center text-sm flex items-center justify-center gap-2"
                >
                    {`${loading ? 'Confirming...' : 'Confirm & Place Order (COD)'}`}
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;