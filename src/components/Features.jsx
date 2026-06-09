import { ShieldCheck, Truck, HeartHandshake } from 'lucide-react';

function Features() {
    const features = [
        {
            icon: <ShieldCheck size={36} className="text-maincolor transition-transform duration-300 group-hover:scale-110" />,
            title: "100% Original",
            description: "Directly imported from official manufacturers with certified authenticity tags."
        },
        {
            icon: <Truck size={36} className="text-maincolor transition-transform duration-300 group-hover:scale-110" />,
            title: "Free Shipping",
            description: "Get free express shipping on all orders over 1,500 EGP anywhere in Egypt."
        },
        {
            icon: <HeartHandshake size={36} className="text-maincolor transition-transform duration-300 group-hover:scale-110" />,
            title: "Expert Guidance",
            description: "Unsure about your supplement stack? Get free advice from our fitness coaches."
        }
    ];

    return (
        <section className="bg-slate-50/50 border-y border-slate-100 py-12 font-montserrat">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((item, index) => (
                        <div 
                            key={index}
                            className="group flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 p-6 bg-white rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Icon Frame */}
                            <div className="flex justify-center items-center w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 shrink-0 shadow-inner group-hover:bg-maincolor/5 transition-all duration-300">
                                {item.icon}
                            </div>
                            {/* Text Details */}
                            <div className="flex flex-col">
                                <h3 className="font-extrabold text-slate-800 text-lg uppercase tracking-wider mb-1.5 group-hover:text-maincolor transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
