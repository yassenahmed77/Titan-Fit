function PersonalDetails({ handleUpdateProfile, userData, handleChange, loading }) {
    return(
        <div className="flex flex-col gap-6 text-left animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="font-extrabold text-slate-800 text-lg uppercase pb-1">Personal Details</h2>
                <p className="text-slate-400 text-xs font-semibold">Update your name and phone number saved in your profile</p>
            </div>
            <hr className="border-slate-100" />
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5">
                {/* Fullname */}
                <div className="flex flex-col gap-2">
                    <label className="uppercase text-slate-500 text-xs font-bold pl-1">Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        defaultValue={!loading && userData.fullname || ""}
                        className={`border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor transition-all bg-slate-50 font-bold text-slate-800 ${loading && 'animate-pulse'}`}
                        onChange={handleChange}
                    />
                </div>
                 {/* Email */}
                <div className="flex flex-col gap-2">
                    <label className="uppercase text-slate-400 text-xs font-bold pl-1">Email Address</label>
                    <input
                        type="email"
                        readOnly
                        value={!loading && userData.email || ""}
                        className={`border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none bg-slate-100/50 text-slate-400 cursor-not-allowed font-bold ${loading && 'animate-pulse'}`}
                    />
                </div>
                 {/* Phone Number */}
                <div className="flex flex-col gap-2">
                    <label className="uppercase text-slate-500 text-xs font-bold pl-1">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        defaultValue={!loading && userData.phone || ""}
                        onChange={handleChange}
                        placeholder="+20 123 456 789"
                        className={`border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor transition-all bg-slate-50 font-bold text-slate-800 ${loading && 'animate-pulse'}`}
                    />
                </div>
                 {/* Submit */}
                <button
                    disabled = {loading}
                    type="submit"
                    className="bg-maincolor text-white px-8 py-3.5 rounded-xl font-bold mt-4 shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl transition-all duration-300 cursor-pointer self-start text-sm"
                >
                    Save Profile Settings
                </button>
            </form>
        </div>
    )
}

export default PersonalDetails