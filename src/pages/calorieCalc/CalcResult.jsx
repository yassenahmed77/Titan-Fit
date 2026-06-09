import { Flame, RefreshCw } from "lucide-react";

const displayNames = {
    maintain: { 
        label: "Maintenance", 
        desc: "Keep current body weight and maintain mass", 
        color: "border-slate-200 text-slate-800 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-300" 
    },
    smallCut: { 
        label: "Mild Weight Loss", 
        desc: "Lose around 0.25 kg per week gently", 
        color: "border-sky-200 text-sky-800 bg-sky-50/30 hover:bg-sky-50 hover:border-sky-300" 
    },
    goodCut: { 
        label: "Weight Loss", 
        desc: "Lose around 0.5 kg per week (recommended)", 
        color: "border-emerald-200 text-emerald-800 bg-emerald-50/30 hover:bg-emerald-50 hover:border-emerald-300" 
    },
    aggresiveCut: { 
        label: "Extreme Cut", 
        desc: "Lose around 1 kg per week (intense phase)", 
        color: "border-rose-200 text-rose-800 bg-rose-50/30 hover:bg-rose-50 hover:border-rose-300" 
    },
    smallbulk: { 
        label: "Mild Muscle Gain", 
        desc: "Gain around 0.25 kg per week with minimal fat", 
        color: "border-sky-200 text-sky-800 bg-sky-50/30 hover:bg-sky-50 hover:border-sky-300" 
    },
    goodBulk: { 
        label: "Muscle Gain", 
        desc: "Gain around 0.5 kg per week for solid bulking", 
        color: "border-emerald-200 text-emerald-800 bg-emerald-50/30 hover:bg-emerald-50 hover:border-emerald-300" 
    },
    dirtyBulk: { 
        label: "Intense Bulking", 
        desc: "Gain around 0.8+ kg per week (maximum surplus)", 
        color: "border-rose-200 text-rose-800 bg-rose-50/30 hover:bg-rose-50 hover:border-rose-300" 
    }
};

function CalcResult({ formData, formattedResults, setSubmitted, calcs }) {
    const chosenGoal = Object.keys(calcs)[0];
    const results = formattedResults();
    return (
                <section className="container flex flex-col gap-6 p-6 sm:p-8 bg-white mt-8 w-full max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl border border-slate-100 animate-fade-in">
                    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-5">
                        <div className="flex flex-col gap-1.5 text-left">
                            <h2 className="uppercase font-extrabold text-xl sm:text-2xl flex items-center gap-2 text-slate-800">
                                <Flame className="text-rose-500 fill-rose-500 bullets-animation" size={24}/> 
                                Calorie Targets
                            </h2>
                            {/* Info */}
                            <div className="flex flex-wrap gap-1.5 text-slate-500 mt-1">
                                <span className="bg-slate-100/80 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold">👤 {formData.age || 18}y</span>
                                <span className="bg-slate-100/80 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold capitalize">⚧️ {formData.gender || "male"}</span>
                                <span className="bg-slate-100/80 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold">⚖️ {formData.weight || 80}kg</span>
                                <span className="bg-slate-100/80 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold">📏 {formData.height || 180}cm</span>
                            </div>
                        </div>
                        {/* Recalculate */}
                        <div 
                            className="group flex items-center gap-2 text-maincolor cursor-pointer bg-slate-50 hover:bg-maincolor/10 px-4 py-2.5 rounded-2xl border border-slate-100 hover:border-maincolor/20 transition-all duration-300 shadow-xs self-start sm:self-auto"
                            onClick={() => setSubmitted(false)}
                        >
                            <RefreshCw size={14} className="group-hover:rotate-180 transition-all duration-300 text-maincolor"/>
                            <h3 className="font-bold text-xs uppercase tracking-wider">Recalculate</h3>
                        </div>
                    </header>
                    <div className="flex flex-col gap-4">
                        {
                            results.map(({key, value, proteinPurse, fatPurse, carbPurse, macros, deficit}) => {
                                // Get [desc, styling colors, label] by key from calculations keys
                                const details = displayNames[key];
                                if (!details) return null;
                                return (
                                    <div key={key} className={`border border-slate-200/60 rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col gap-4 shadow-sm hover:shadow-md ${details.color}`}>
                                        {/* Calorie Card [maintain & bulk...]*/}
                                        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row justify-between items-start gap-3">
                                            <div className="text-left">
                                                <div className="flex gap-2 items-center flex-wrap">
                                                    <h1 className="font-bold capitalize text-sm sm:text-base">{details.label}</h1>
                                                    <span className={`uppercase text-[8px] sm:text-[9px] font-semibold bg-slate-200 flex items-center rounded-2xl px-2 py-0.5 h-fit w-fit`}>{deficit === 0 ? 'base level' : `${deficit > 0 ? '+' : ''}${deficit} kcal`}</span>
                                                </div>
                                                <p className="text-slate-500 text-xs mt-1 leading-tight">{details.desc}</p>
                                            </div>
                                            <div className="text-left sm:text-right shrink-0">
                                                <span className="font-bold text-lg sm:text-xl text-slate-800">{Math.round(value).toLocaleString()}</span>
                                                <span className="text-slate-500 text-[10px] sm:text-xs block leading-none sm:mt-0.5">kcal/day</span>
                                            </div>
                                        </div>
                                        {/* Calories & Macros */}
                                        <section className="flex flex-col gap-3">
                                            {/* Purses */}
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-slate-500 font-bold uppercase text-[10px] gap-1 text-left">
                                                <h3>recommended macro split</h3>
                                                <span className="text-slate-400">{`${proteinPurse * 100}% P / ${carbPurse * 100}% C / ${fatPurse * 100}% C`}</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                                {/* Macros [grams & calories] */}
                                                {Object.entries(macros).map(([key,value]) => {
                                                    return(
                                                    <div className="flex flex-col items-center bg-white rounded-xl border border-slate-100 px-1 py-2 sm:p-2 gap-0.5 shadow-xs" key={key}>
                                                        <h3 className={`uppercase font-bold text-[9px] sm:text-xs ${value.color}`} >{key === "protien" ? "Protein" : key}</h3>
                                                        <span className="font-bold text-xs sm:text-sm text-slate-850">{value.gram}g</span>
                                                        <span className="text-[9px] text-slate-500 leading-none">{value.calorie} kcal</span>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                    </div>
                                );
                            })
                        }
                    </div>
                </section>
            
    )
}

export default CalcResult