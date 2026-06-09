import { Dna, Flame, Ruler, Scale, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Fitness({userData}) {
    const navigate = useNavigate();
    return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
        {/* Header */}
        <div>
            <h2 className="font-extrabold text-slate-800 text-lg uppercase pb-1">Calorie & Fitness Metrics</h2>
            <p className="text-slate-400 text-xs font-semibold">Active variables synced from your last calculator usage</p>
        </div>
        <hr className="border-slate-100" />
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Calories */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow duration-350">
                <div className="w-10 h-10 bg-white border border-slate-150 text-maincolor rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <Flame size={18} />
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Calorie Target</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                        {userData.calories ? `${userData.calories} kcal` : "No goal set"}
                    </h3>
                </div>
            </div>
            {/* Weight */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow duration-350">
                <div className="w-10 h-10 bg-white border border-slate-150 text-maincolor rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <Scale size={18} />
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Body Weight</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                        {userData.weight ? `${userData.weight} kg` : "N/A"}
                    </h3>
                </div>
            </div>
            {/* Height */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow duration-350">
                <div className="w-10 h-10 bg-white border border-slate-150 text-maincolor rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <Ruler size={18} />
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Body Height</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                        {userData.height ? `${userData.height} cm` : "N/A"}
                    </h3>
                </div>
            </div>
            {/* Goal */}
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex items-center gap-4 hover:shadow-sm transition-shadow duration-350">
                <div className="w-10 h-10 bg-white border border-slate-150 text-maincolor rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                    <Dna size={18} />
                </div>
                <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Active Goal</span>
                    <h3 className="text-base font-extrabold text-slate-800 mt-0.5 capitalize">
                        {userData.goal === "lose" ? "Lose Weight" : userData.goal === "gain" ? "Gain Weight" : "Not Set"}
                    </h3>
                </div>
            </div>
        </div>
        {/* Navigating To Calorie Calculator */}
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h4 className="font-bold text-slate-800 text-sm uppercase">Recalculate calories</h4>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">Re-run your metrics calculator to update your dashboard stats</p>
            </div>
            <button
                onClick={() => navigate("/service")}
                className="bg-maincolor text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase shadow-md shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
                <TrendingUp size={14} />
                <span>Go to Calculator</span>
            </button>
        </div>
    </div>
    )
}

export default Fitness