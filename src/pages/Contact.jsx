import { useState } from "react";
import { toast } from "react-hot-toast";
import { Mail, Phone, MapPin, Sparkles, Send, Clock, ShieldCheck } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "Product Inquiry",
        message: ""
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            toast.success("Message sent! Our support team will contact you shortly.");
            setFormData({ name: "", email: "", subject: "Product Inquiry", message: "" });
            setLoading(false);
        }, 1000);
    }

    return (
        <section className="min-h-screen bg-slate-50/50 pt-36 pb-20 font-montserrat overflow-x-hidden">
            <div className="container max-w-6xl">
                <ScrollReveal variant="fade-down" duration="duration-1000">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maincolor/10 text-maincolor text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles size={12} />
                            <span>Customer Support</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight uppercase">Get In Touch</h1>
                        <p className="text-slate-500 text-sm sm:text-base mt-3">Have a question about our supplements, activewear, or an existing order? We are here to help.</p>
                    </div>
                </ScrollReveal>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-5">
                        <ScrollReveal variant="fade-left" duration="duration-1000" delay="delay-100">
                            <div className="flex flex-col gap-6">
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-6">
                                    <h2 className="font-extrabold text-slate-850 text-xl uppercase border-b border-slate-100 pb-3 text-left">Contact Information</h2>
                                    <div className="flex flex-col gap-4 text-left">
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 rounded-xl bg-slate-50 text-maincolor shrink-0">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-slate-400">Email Us</h4>
                                                <p className="text-slate-800 text-sm font-semibold mt-0.5">support@fitnessapp.com</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 rounded-xl bg-slate-50 text-maincolor shrink-0">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-slate-400">Call Us</h4>
                                                <p className="text-slate-800 text-sm font-semibold mt-0.5">+20 100 123 4567</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 rounded-xl bg-slate-50 text-maincolor shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase text-slate-400">Our Location</h4>
                                                <p className="text-slate-800 text-sm font-semibold mt-0.5">Shubra, Cairo, Egypt</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                                        <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                                            <Clock size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-slate-800 text-sm uppercase">Support Hours</h3>
                                            <p className="text-slate-400 text-xs mt-1 leading-relaxed font-semibold">Our support team is active from Saturday to Thursday, 9:00 AM to 10:00 PM.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-slate-800 text-sm uppercase">100% Genuine Products</h3>
                                            <p className="text-slate-400 text-xs mt-1 leading-relaxed font-semibold">We only import certified, original products directly from officially licensed global brands.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:col-span-7">
                        <ScrollReveal variant="fade-right" duration="duration-1000" delay="delay-200">
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                                <h2 className="font-extrabold text-slate-850 text-xl uppercase mb-6 text-left">Send Us a Message</h2>
                                <form className="flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="name" className="uppercase text-slate-700 text-xs font-bold">Your Name</label>
                                        <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="email" className="uppercase text-slate-700 text-xs font-bold">Email Address</label>
                                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="subject" className="uppercase text-slate-700 text-xs font-bold">Inquiry Type</label>
                                        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold appearance-none cursor-pointer">
                                            <option value="Product Inquiry">Product Inquiry</option>
                                            <option value="Order Status">Order Status & Tracking</option>
                                            <option value="Return Request">Return & Exchange</option>
                                            <option value="General Question">General Question</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="message" className="uppercase text-slate-700 text-xs font-bold">Your Message</label>
                                        <textarea required id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Write your message here..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-maincolor focus:bg-white transition-all font-semibold resize-none"></textarea>
                                    </div>
                                    <button type="submit" disabled={loading} className="w-full bg-maincolor text-white font-bold uppercase py-4 rounded-xl shadow-lg shadow-maincolor/30 hover:bg-maincolor/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-2 text-center text-sm flex items-center justify-center gap-2">
                                        {loading ? "Sending..." : (
                                            <>
                                                <Send size={16} />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
