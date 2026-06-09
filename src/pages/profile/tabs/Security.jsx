import { LogOut, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import toast from "react-hot-toast";

function Security({ handleLogout }) {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    // Update inputs value
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    // Updating User Password
    async function handleSubmit(e) {
        e.preventDefault();
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; // 6 characters and contains numbers & letters
        if (!passwordRegex.test(formData.password)) {
            toast.error(
                <div>Password must be at least 6 characters and contain both letters and numbers.</div>,
                { duration: 3000 }
            );
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error(
                <div>Passwords do not match!</div>,
                { duration: 3000 }
            );
            return;
        }
        try {
            setLoading(true);
            const { error } = await supabase.auth.updateUser({
                password: formData.password
            });
            if (error) throw error;
            toast.success(
                <div>Password updated successfully</div>,
                { duration: 3000 }
            );
            setFormData({
                password: "",
                confirmPassword: ""
            });
        } catch (error) {
            toast.error(
                <div>{error.message}</div>,
                { duration: 3000 }
            );
            setFormData({
                password: "",
                confirmPassword: ""
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-6 text-left animate-fade-in">
            <div>
                <h2 className="font-extrabold text-slate-800 text-lg uppercase pb-1">Account & Security</h2>
                <p className="text-slate-400 text-xs font-semibold">Change your password and manage active sign in sessions</p>
            </div>
            <hr className="border-slate-100" />
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* New Password */}
                <div className="flex flex-col gap-2">
                    <label className="uppercase text-slate-500 text-xs font-bold pl-1">New Password</label>
                    <div className="relative">
                        <input
                            disabled={loading}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm outline-none focus:border-maincolor transition-all bg-slate-50 font-bold text-slate-800 disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-maincolor transition-colors cursor-pointer"
                        >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                {/* Confirm New Password */}
                <div className="flex flex-col gap-2">
                    <label className="uppercase text-slate-500 text-xs font-bold pl-1">Confirm New Password</label>
                    <div className="relative">
                        <input
                            disabled={loading}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            type={showConfirmPass ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="w-full border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm outline-none focus:border-maincolor transition-all bg-slate-50 font-bold text-slate-800 disabled:opacity-50"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-maincolor transition-colors cursor-pointer"
                        >
                            {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-maincolor text-white px-8 py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer self-start text-sm flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                >
                    <ShieldCheck size={16} />
                    <span>{loading ? "Changing..." : "Change Password"}</span>
                </button>
            </form>
            <hr className="border-slate-100" />
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-5 border border-rose-100 bg-rose-50/20 rounded-2xl gap-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-sm uppercase">Sign Out</h4>
                    <p className="text-slate-450 text-xs font-semibold mt-0.5">Logout and terminate your active browser session</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-rose-500 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase shadow-md shadow-rose-500/20 hover:bg-rose-600 shadow-rose-500/10 hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0"
                >
                    <LogOut size={14} />
                    <span>Log Out Session</span>
                </button>
            </div>
        </div>
    );
}

export default Security;