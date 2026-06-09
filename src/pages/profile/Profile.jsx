import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { 
    User, 
    Flame, 
    Settings,  
    ShoppingBag, 
    ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import PersonalDetails from "./tabs/PersonalDetails";
import Fitness from "./tabs/Fitness";
import Orders from "./tabs/Orders";
import Security from "./tabs/Security";

function Profile() {
    const [userData, setUserData] = useState({});
    const [activeTab, setActiveTab] = useState("personal");
    const [loading, setLoading] = useState(true);
    const initials = userData.fullname?.split(" ").map(n => n[0]) ;
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [updatedData, setUpdatedData] = useState({
        fullname: "",
        phone: ""
    });

    // Get profile data
    useEffect(() => {
        async function getProfile() {
            setLoading(true);
            const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
            if (data) {
                setUserData(data);
                setLoading(false);
            } else {
                const newProfile = {
                    id: user.id,
                    fullname: user.user_metadata.full_name,
                    email: user.email
                };
                await supabase.from("profiles").insert(newProfile);
                setUserData(newProfile);
                setLoading(false);
            }
        }
        getProfile();
    }, [user]);

    // Update inputs value on change
    const handleChange = (e) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value
        });
    };

    // Update profile info in supabase database
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from("profiles").update({
                fullname: updatedData.fullname || userData.fullname,
                phone: updatedData.phone || userData.phone,
            }).eq("id", userData.id);
            if (error) throw error;
            setUserData({
                ...userData,
                fullname: updatedData.fullname || userData.fullname,
                phone: updatedData.phone || userData.phone,
            });
            toast.success(
                <div>Updated Successfully.</div>,
                { duration: 3000 }
            );
            setUpdatedData({
                fullname: "",
                phone: ""
            });
        } catch (error) {
            toast.error(
                <div>{error.message}</div>,
                { duration: 3000 }
            );
        }
    };

    // Logout session and go to login page
    const handleLogout = async () => {
        await logout();
        navigate("/login", {replace: true});
    };

    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight uppercase">User Profile</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your active metrics, account details and security settings</p>
                    </div>
                    <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-sm font-bold text-maincolor hover:text-maincolor/80 transition-colors group cursor-pointer bg-transparent border-0 outline-none">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        <span>Back To Home</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                    {/* Sidebar */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">
                        {loading ? (
                            <div className="flex flex-col items-center text-center">
                                <span className="w-20 h-20 bg-slate-100 rounded-full border-maincolor  mb-4 shrink-0 shadow-inner animate-pulse"></span>
                                <h2 className="w-60 h-6 bg-slate-100 animate-pulse rounded-xl"></h2>
                                <p className="w-40 h-4 bg-slate-100 animate-pulse mt-3 rounded-xl"></p>
                            </div>
                        ) : (
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-maincolor border border-slate-150 font-black text-2xl mb-4 shrink-0 shadow-inner">
                                {initials || "FU"}
                            </div>
                            <h2 className="font-extrabold text-slate-800 text-lg uppercase">{ user?.user_metadata?.full_name || "Fitness User"}</h2>
                            <p className="text-slate-400 text-xs font-semibold mt-1">{user?.user_metadata?.email || "user@domain.com"}</p>
                        </div>
                        ) }
                        <hr className="border-slate-100" />
                        <div className="flex flex-col gap-2.5">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`flex items-center gap-3.5 w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm uppercase transition-all duration-300 cursor-pointer ${
                                    activeTab === "personal"
                                        ? "bg-maincolor text-white shadow-lg shadow-maincolor/30"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-maincolor"
                                }`}
                            >
                                <User size={16} />
                                <span>Personal Info</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("fitness")}
                                className={`flex items-center gap-3.5 w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm uppercase transition-all duration-300 cursor-pointer ${
                                    activeTab === "fitness"
                                        ? "bg-maincolor text-white shadow-lg shadow-maincolor/30"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-maincolor"
                                }`}
                            >
                                <Flame size={16} />
                                <span>Fitness Stats</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center gap-3.5 w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm uppercase transition-all duration-300 cursor-pointer ${
                                    activeTab === "orders"
                                        ? "bg-maincolor text-white shadow-lg shadow-maincolor/30"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-maincolor"
                                }`}
                            >
                                <ShoppingBag size={16} />
                                <span>Shopping Summary</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`flex items-center gap-3.5 w-full text-left px-5 py-3.5 rounded-xl font-bold text-sm uppercase transition-all duration-300 cursor-pointer ${
                                    activeTab === "security"
                                        ? "bg-maincolor text-white shadow-lg shadow-maincolor/30"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-maincolor"
                                }`}
                            >
                                <Settings size={16} />
                                <span>Security</span>
                            </button>
                        </div>
                    </div>
                    {/* Tabs Content */}
                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm  flex flex-col gap-6">
                        {/* Personal Details Tab */}
                        {activeTab === "personal" && <PersonalDetails handleUpdateProfile = { handleUpdateProfile } userData = { userData }handleChange = { handleChange } loading={loading}/>}
                        {/* Fitness Stats Tab */}
                        {activeTab === "fitness" && <Fitness userData = { userData }/> }
                        {/* Orders Tab */}
                        {activeTab === "orders" && <Orders/>}
                        {/* Security Tab */}
                        {activeTab === "security" && <Security handleLogout = { handleLogout }/>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;