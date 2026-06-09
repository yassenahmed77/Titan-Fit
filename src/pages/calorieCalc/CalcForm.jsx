import { User, Ruler, Scale, Activity, Dna } from "lucide-react";
import CalcResult from "./CalcResult";
import useCalorieCalculator from "./CalcLogic";
function CalcForm() {
    const {formData, submitted, setSubmitted, calcs, handleChange, handleSubmit} = useCalorieCalculator();
    return (
        <div className="flex flex-col justify-center items-center pt-8 pb-12 px-4 gap-2 bg-slate-50 min-h-screen">
            <h1 className="uppercase font-bold text-2xl sm:text-3xl bg-gradient-to-r from-slate-900 to-maincolor bg-clip-text text-transparent text-center">Calorie Calculator</h1>
            <p className="text-maincolor text-center text-xs sm:text-sm max-w-md">Calculate your daily calorie needs based on your personal metrics and activity level</p>
            {!submitted ? (
                <form className="container grid grid-cols-1 lg:grid-cols-2 gap-5 p-6 sm:p-9 bg-white mt-8 w-full max-w-xl lg:max-w-3xl rounded-2xl shadow-2xl border border-slate-100" onSubmit={handleSubmit}>
                    <div className="calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="age">Age</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <User size={18} />
                            </span>
                            <input required type="number" id="age" placeholder="18" className="calc-input " name="age" value={formData.age} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Gender */}
                    <div className="calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="gender">Gender</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <User size={18} />
                            </span>
                            <select id="gender" name="gender" className="calc-input  appearance-none cursor-pointer" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                                ▼
                            </span>
                        </div>
                    </div>
                    {/* Height */}
                    <div className="calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="height">Height</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Ruler size={18} />
                            </span>
                            <input required type="number" id="height" placeholder="cm" className="calc-input " name="height" value={formData.height} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Weight */}
                    <div className="calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="weight">Weight</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Scale size={18} />
                            </span>
                            <input required type="number" id="weight" placeholder="kg" className="calc-input " name="weight" value={formData.weight} onChange={handleChange} />
                        </div>
                    </div>
                    {/* Activity Level */}
                    <div className="col-span-1 lg:col-span-2 w-full calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="activity">Activity Level</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Activity size={18} />
                            </span>
                            <select id="activity" name="activity" className="calc-input  appearance-none cursor-pointer" value={formData.activity} onChange={handleChange} required>
                                <option value="">Choose Your Activity Level.</option>
                                <option value="1">BMR</option>
                                <option value="1.2">Little Or No Exercise</option>
                                <option value="1.375">Exercise 1-3 times per week</option>
                                <option value="1.55">Exercise 4-5 times per week</option>
                                <option value="1.725">Daily Exercise</option>
                                <option value="1.9">Intense Exercise</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                                ▼
                            </span>
                        </div>
                    </div>
                    {/* Goal */}
                    <div className="col-span-1 lg:col-span-2 w-full calc-div text-left">
                        <label className="uppercase text-slate-700 text-sm font-semibold mb-1" htmlFor="activity">Goal</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                <Dna size={18} />
                            </span>
                            <select id="goal" name="goal" className="calc-input  appearance-none cursor-pointer" value={formData.goal} onChange={handleChange} required>
                                <option value="">Select Your Goal.</option>
                                <option value="gain">Gain Weight</option>
                                <option value="lose">Lose Weight</option>
                            </select>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                                ▼
                            </span>
                        </div>
                    </div>
                    {/* Submit */}
                    <button type="submit" className="bg-maincolor text-white p-3 w-full col-span-1 lg:col-span-2 rounded-2xl font-bold uppercase cursor-pointer hover:shadow-xl transition-all duration-300">Calculate Calories</button>
                </form>
            ) : <CalcResult formData={formData} calcs={calcs} setSubmitted={setSubmitted} />
                }
        </div>
    );
}

export default CalcForm;