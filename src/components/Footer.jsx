import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900 font-montserrat relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand Info */}
                    <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
                        <Link to="/" className="w-14 h-14 block p-1 hover:scale-105 transition-transform duration-300">
                            <img src="icons/logo-white.png" alt="Logo" className="w-full h-full object-contain" />
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400 mt-2">
                            Fuel your workouts and achieve your fitness goals with our top-tier, certified supplements and high-performance activewear.
                        </p>
                    </div>
                    {/* Quick Links */}
                    <div className="flex flex-col gap-4 text-center md:text-left">
                        <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="flex flex-col gap-2.5 text-sm font-semibold">
                            <li>
                                <a href="/#products" className="hover:text-maincolor transition-colors duration-200">Shop Products</a>
                            </li>
                            <li>
                                <Link to="/service" className="hover:text-maincolor transition-colors duration-200">Calorie Calculator</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="hover:text-maincolor transition-colors duration-200">Your Cart</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-maincolor transition-colors duration-200">Register</Link>
                            </li>
                        </ul>
                    </div>
                    {/* Contact Info */}
                    <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
                        <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Get in Touch</h4>
                        <ul className="flex flex-col gap-3 text-sm font-semibold">
                            <li className="flex gap-2.5 items-center justify-center md:justify-start">
                                <Mail size={16} className="text-maincolor" />
                                <span>support@fitnessapp.com</span>
                            </li>
                            <li className="flex gap-2.5 items-center justify-center md:justify-start">
                                <Phone size={16} className="text-maincolor" />
                                <span>+20 100 123 4567</span>
                            </li>
                            <li className="flex gap-2.5 items-center justify-center md:justify-start">
                                <MapPin size={16} className="text-maincolor" />
                                <span>Shubra, Cairo, Egypt</span>
                            </li>
                        </ul>
                    </div>
                    {/* Social links & Newsletter placeholder */}
                    <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
                        <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Follow Us</h4>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            Stay updated with our latest offers, workout tips, and premium product arrivals.
                        </p>
                        <div className="flex gap-3 mt-2">
                            {/* Facebook SVG */}
                            <a href="https://www.facebook.com/yassenazarooo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-maincolor/30 hover:bg-maincolor/5 flex items-center justify-center text-slate-400 hover:text-maincolor transition-all duration-300">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                                </svg>
                            </a>
                            {/* Instagram SVG */}
                            <a href="https://instagram.com/yassenazaroo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-maincolor/30 hover:bg-maincolor/5 flex items-center justify-center text-slate-400 hover:text-maincolor transition-all duration-300">
                                <svg className="w-5 h-5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/>
                                </svg>
                            </a>
                            {/* Youtube SVG */}
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-maincolor/30 hover:bg-maincolor/5 flex items-center justify-center text-slate-400 hover:text-maincolor transition-all duration-300">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500 text-center sm:text-left">
                    <p>© {currentYear} Premium Supplements. All rights reserved.</p>
                    <p>Made with <span className="animate-pulse">❤️</span> by <a href='https://www.linkedin.com/in/yassen-ahmed-dev/' target='_blank' className="text-maincolor ml-1 cursor-pointer">{"<yassen />"}</a>
                    </p>
                    <p className="flex items-center gap-1">
                        Made in Egypt
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
