import { Link, useLocation} from 'react-router-dom';
import { CircleUserRound, Search, ShoppingCart, TextAlignJustify, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import SearchBox from './SearchBox';
import { useSelector } from 'react-redux';
const list = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Services", link: "/service" },
    { name: "Contact", link: "/contact" },
];
function Header() {
    const menuRef = useRef();
    const headerRef = useRef();
    const location = useLocation();
    const isNavigated = location.pathname !== "/";
    const [listOpen, setListOpen] = useState(false);
    const [hoverd, setHoverd] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const active = scrolled || searchBarOpen || hoverd;
    const cartItems = useSelector((state) => state.cart.cartItems);
    // Closing menu on clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setListOpen(false);
            }
        }
        if (listOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listOpen]);
    // Changing header styles onscroll
    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        };
    }, [])
    return (
        <header onMouseEnter={() => setHoverd(true)} onMouseLeave={() => setHoverd(false)} ref={headerRef} className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${active || isNavigated ? 'bg-white text-black py-10' : 'bg-transparent py-7 text-white'}`}>
            <div className="container">
                <div className='grid grid-cols-3 items-center'>
                    {/* Mobile Menu */}
                    <TextAlignJustify className='block flex-1 lg:hidden cursor-pointer hover:scale-110 transition-all duration-300' onClick={() => setListOpen(!listOpen)} />
                    <div ref={menuRef} className={`fixed top-0 left-0 w-[80%] h-screen bg-white transition-all duration-300 pt-[30px] px-6 lg:hidden ${!hoverd && "text-black"} ${listOpen ? "translate-x-0" : "-translate-x-full"}`} onClick={() => setListOpen(false)}>
                        <ul className='flex gap-5 flex-col'>
                            {list.map((item) => {
                                return (
                                    <li key={item.name} className="transition-all duration-300 hover:-translate-y-1 font-bold p-2.5 border-b border-gray-300 hover:border-black cursor-pointer">
                                        <Link to={item.link}>{item.name}</Link>
                                    </li>
                                )
                            })}
                            <li className="transition-all duration-300 hover:-translate-y-1 font-bold p-2.5 border-b border-gray-300 hover:border-black cursor-pointer">
                                <Link to="/profile">Profile</Link>
                            </li>
                        </ul>
                        <X className='cursor-pointer absolute top-2.5 right-2.5' onClick={() => setListOpen(false)} />
                    </div>
                    {/* Links */}
                    <nav className='flex-1 hidden lg:block'>
                        <ul className='flex gap-5'>
                            {list.map((item) => {
                                return (
                                    <li key={item.name} className='transition-all duration-300 hover:-translate-y-1 font-bold'>
                                        <Link to={item.link}>{item.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                    {/* Logo */}
                    <div className='flex justify-center'>
                        <Link to={"/"} className='w-[50px] max-w-full h-[50px] block'><img src={`${active || isNavigated ? "icons/logo.jpg" : "icons/logo-white.png"}`} alt="" className='w-full h-full' /></Link>
                    </div>
                    {/* Profile & Cart */}
                    <div className='flex gap-5 justify-end'>
                        <button className='transition-all duration-300 hover:scale-110 cursor-pointer' onClick={() => setSearchBarOpen(!searchBarOpen)}><Search /></button>
                        <Link to={"/profile"} className='hidden lg:block transition-all duration-300 hover:scale-110'><CircleUserRound /></Link>
                        <span className='relative transition-all duration-300 hover:scale-110'>
                            <Link to={"/cart"}><ShoppingCart /></Link>
                            {cartItems.length > 0 && (<span className='absolute -top-1.5 -right-2 h-4.5 w-4.5 bg-maincolor rounded-2xl flex items-center justify-center text-xs text-white font-extrabold'>{cartItems.length}</span>)}
                        </span>
                    </div>
                </div>
            </div>
                <SearchBox searchBarOpen={searchBarOpen} setSearchBarOpen={setSearchBarOpen}/>
        </header>
    )
}

export default Header