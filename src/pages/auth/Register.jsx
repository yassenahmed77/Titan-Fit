import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, UserPlus, Shield, ArrowRight, Eye, EyeOff } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";

function Register() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    const navigate = useNavigate();
    const timerRef = useRef();
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    // Update inputs value and reset error
    function handleChange(e) {
        setErrMessage("");
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    // Check inputs validation and sign up using supabase
    async function handleSignUp(e) {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // user@example.com
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; // 6 characters and contains numbers & letters
        const trimmedEmail = formData.email.trim();
        if (!emailRegex.test(trimmedEmail)) {
            setErrMessage("Please enter a valid email address.");
            return;
        }
        if (!passwordRegex.test(formData.password)) {
            setErrMessage("Password must be at least 6 characters and contain both letters and numbers.");
            return;
        }
        if (formData.password !== formData.confirmPass) {
            setErrMessage("Passwords do not match!");
            return;
        }
        try {
            setLoading(true);
            const { data: { user }, error } = await supabase.auth.signUp({
                email: trimmedEmail,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullname,
                    },
                },
            });
            if (error) throw error;
            if (user && user.identities?.length === 0) {
                setErrMessage("This email is already registered."); 
                return;
            }
            toast.success(
                <div>
                    Account created! Check your email to verify.
                </div>, { duration: 3000 }
            );
            timerRef.current = setTimeout(() => {
                navigate("/login");
            }, 3000);
            setFormData({
                fullname: "",
                email: "",
                password: "",
                confirmPass: "",
            });
        } catch (error) {
            setErrMessage(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20 flex items-center justify-center font-montserrat overflow-x-hidden">
            <div className="container max-w-md w-full">
                <ScrollReveal variant="fade-down" duration="duration-1000">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/40 relative overflow-hidden">
                        {/* Header */}
                        <div className="text-center mb-8 relative">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-maincolor/10 text-maincolor mb-4">
                                <UserPlus size={24} />
                            </div>
                            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight uppercase">{loading ? "Creating..." : "Create Account"}</h1>
                            <p className="text-slate-400 text-xs mt-1.5 font-semibold">Join us to start your fitness journey</p>
                        </div>
                        {/* Register Form */}
                        <form className="flex flex-col gap-5 text-left relative" onSubmit={handleSignUp}>
                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="uppercase text-slate-700 text-xs font-bold pl-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <User size={18} />
                                    </div>
                                    <input 
                                        disabled={loading}
                                        required 
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        type="text" 
                                        placeholder="John Doe" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold"
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                                <label className="uppercase text-slate-700 text-xs font-bold pl-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input 
                                        disabled={loading}
                                        required 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email" 
                                        placeholder="name@domain.com" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold"
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="uppercase text-slate-700 text-xs font-bold pl-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input 
                                        disabled={loading}
                                        required
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
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
                            </div>
                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1.5">
                                <label className="uppercase text-slate-700 text-xs font-bold pl-1">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Shield size={18} />
                                    </div>
                                    <input 
                                        disabled={loading}
                                        required
                                        name="confirmPass"
                                        value={formData.confirmPass}
                                        onChange={handleChange}
                                        type={showConfirmPass ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 py-3.5 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPass(!showConfirmPass)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-maincolor transition-colors cursor-pointer"
                                    >
                                        {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errMessage && <p className="mx-auto mt-1.5 text-rose-700 font-semibold text-xs">{errMessage}</p>}
                            </div>
                            {/* Terms and Conditions */}
                            <div className="flex items-start gap-2.5 mt-1">
                                <input 
                                    disabled={loading}
                                    required
                                    type="checkbox" 
                                    id="terms" 
                                    className="mt-1.5 rounded border-slate-300 text-maincolor focus:ring-maincolor cursor-pointer accent-[#4e738a]" 
                                />
                                <label htmlFor="terms" className="text-xs text-slate-500 leading-normal cursor-pointer select-none">
                                    I agree to the <span className="text-maincolor hover:underline font-semibold">Terms of Service</span> and <span className="text-maincolor hover:underline font-semibold">Privacy Policy</span>.
                                </label>
                            </div>
                            {/* Submit Button */}
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-2xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-4 text-center text-sm flex items-center justify-center gap-2 group disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
                            >
                                <span>Create Account</span>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
                            </button>
                        </form>
                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 border-b border-slate-100"></div>
                            <span className="px-3 text-slate-400 text-xs font-bold uppercase">Or</span>
                            <div className="flex-1 border-b border-slate-100"></div>
                        </div>
                        {/* Link to Login */}
                        <div className="text-center">
                            <p className="text-xs text-slate-500 font-semibold">
                                Already have an account?{" "}
                                <Link to="/login" className="text-maincolor hover:underline font-bold transition-all uppercase pl-1">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

export default Register;