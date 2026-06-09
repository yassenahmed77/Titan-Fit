import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Eye, ArrowRight, EyeOff } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

function Login() {
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Reset error message and update inputs value
    function handleChange(e) {
        setErrMessage("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // Check email format and sign in using supabase
    async function handleSubmit(e) {
        e.preventDefault();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const trimmedEmail = formData.email.trim();

        // Validate email format
        if (!emailRegex.test(trimmedEmail)) {
            setErrMessage("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email: trimmedEmail,
                password: formData.password
            });
            if (error) throw error;
            
            // Go to profile page after success login
            navigate("/profile", { replace: true });
            setFormData({
                email: "",
                password: ""
            });
        } catch (error) {
            setErrMessage(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20 flex items-center justify-center font-montserrat overflow-x-hidden">
            <div className="container max-w-md w-full">
                <ScrollReveal variant="fade-down" duration="duration-1000">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 relative overflow-hidden">
                        {/* Ambient background glow accents */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-maincolor/5 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-maincolor/5 rounded-full blur-2xl"></div>
                        
                        {/* Header */}
                        <div className="text-center mb-8 relative">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor mb-4">
                                <LogIn size={24} />
                            </div>
                            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight uppercase">
                                Sign In
                            </h1>
                            <p className="text-slate-400 text-xs mt-1.5 font-semibold">
                                Enter your credentials to access your account
                            </p>
                        </div>
                        {/* Login Form */}
                        <form className="flex flex-col gap-5 text-left relative" onSubmit={handleSubmit}>
                            {/* Email Address */}
                            <div className="flex flex-col gap-1.5">
                                <label className="uppercase text-slate-700 text-xs font-bold pl-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        disabled={loading}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                        name="email"
                                        type="email" 
                                        placeholder="name@domain.com" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold"
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between pl-1">
                                    <label className="uppercase text-slate-700 text-xs font-bold">Password</label>
                                    <Link to="/reset-password" className="text-maincolor hover:underline text-[10px] font-bold uppercase">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        disabled={loading}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        name="password"
                                        type={showPass ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 py-3.5 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-maincolor transition-colors cursor-pointer"
                                    >
                                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errMessage && <p className="mx-auto mt-1.5 text-rose-700 font-semibold text-xs">{errMessage}</p>}
                            </div>
                            {/* Submit Button */}
                            <button 
                                disabled={loading}
                                type="submit"
                                className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-2xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-4 text-center text-sm flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                            >
                                <span>{loading ? "Signing In..." : "Sign In"}</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
                            </button>
                        </form>
                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-b border-slate-100"></div>
                            <span className="px-3 text-slate-400 text-xs font-bold uppercase">Or</span>
                            <div className="flex-1 border-b border-slate-100"></div>
                        </div>
                        {/* Link to Register */}
                        <div className="text-center">
                            <p className="text-xs text-slate-500 font-semibold">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-maincolor hover:underline font-bold transition-all uppercase pl-1">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

export default Login;