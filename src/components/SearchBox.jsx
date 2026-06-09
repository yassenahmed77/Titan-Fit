import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';

function SearchBox({searchBarOpen, setSearchBarOpen }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    async function getSearchedProducts() {
        if (!searchTerm.trim()) {
            setSearchedProducts([]);
            return;
        }
        try {
            const { data, error } = await supabase.from('supplements').select('*').or(`brand.ilike.%${searchTerm}%,flavor.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
            if (error) throw error;
            setSearchedProducts(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    // Reducing API calls 
    useEffect(() => {
        const timeout = setTimeout(() => {
            getSearchedProducts();
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchTerm]);
    // Clear search when closed
    useEffect(() => {
        if (!searchBarOpen) {
            setSearchTerm("");
            setSearchedProducts([]);
        }
    }, [searchBarOpen]);

    function handleSearch() {
        setSearchBarOpen(false);
        setSearchTerm('');
    }

    return (
        <>
            {/* Backdrop Blur */}
            {searchBarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/25 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setSearchBarOpen(false)}
                />
            )}
            {/* Dropdown Search Box */}
            <div className={`bg-white text-black flex flex-col items-center justify-center absolute top-full left-0 w-full border-t border-slate-100 shadow-xl transition-all duration-300 ease-in-out z-50 ${searchBarOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                <div className="w-full max-w-3xl px-6 py-4 sm:py-6 flex flex-col items-center">
                    <form className="relative flex w-full items-center bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 shadow-sm focus-within:border-maincolor focus-within:ring-2 focus-within:ring-maincolor/20 transition-all duration-300" onSubmit={(e) => e.preventDefault()}>
                        <Search className="text-slate-400 mr-3 shrink-0" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search premium products..." 
                            className="w-full bg-transparent text-slate-800 font-medium placeholder-slate-400 outline-none text-sm sm:text-base" 
                            autoFocus 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        {searchTerm && (
                            <button 
                                type="button"
                                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mr-3 cursor-pointer" 
                                onClick={() => setSearchTerm("")}
                            >
                                Clear
                            </button>
                        )}
                        <X className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors" size={18} onClick={() => setSearchBarOpen(false)}/>
                    </form>
                    {errorMessage && <p className="error mt-3 text-sm">{errorMessage}</p>}
                </div>
                {/* Suggestions Slider */}
                {searchedProducts.length > 0 && (
                    <div className="w-full bg-slate-50/50 border-t border-slate-100 py-6 overflow-hidden">
                        <div className="container">
                            <div className="flex items-center justify-between mb-3 px-4">
                                <h3 className="font-bold text-slate-500 tracking-wider text-[11px] uppercase">Suggested Products</h3>
                                <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-full">
                                    {searchedProducts.length} items
                                </span>
                            </div>
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={16}
                                breakpoints={{
                                    0: { slidesPerView: 1.2 },
                                    550: { slidesPerView: 2.2 },
                                    768: { slidesPerView: 3.2 },
                                    1024: { slidesPerView: 4 }
                                }}
                                className="w-full !px-4"
                            >
                                {searchedProducts.map((product) => (
                                    <SwiperSlide key={product.id} className="h-auto">
                                        <Link 
                                            to={`/products/${product.id}`} 
                                            onClick={handleSearch}
                                            className="block text-black hover:no-underline"
                                        >
                                            <div className='flex flex-col justify-center items-center border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-[280px] bg-white relative group cursor-pointer'>
                                                {/* Card Content */}
                                                <span className="absolute top-2 left-3 bg-slate-100 text-slate-500 font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-md">
                                                    {product.category?.replaceAll("-", " ")}
                                                </span>
                                                
                                                <div className='w-[150px] h-[150px] mx-auto flex items-center justify-center mb-3 mt-2'>
                                                    <img src={product.image} alt="" className='max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300'/>
                                                </div>
                                                
                                                <h1 className='capitalize italic font-bold text-slate-800 text-xs text-center line-clamp-1 group-hover:text-maincolor transition-colors px-2'>
                                                    {`${product.brand} ${product.flavor} ${product.category?.replaceAll("-", " ")}`}
                                                </h1>
                                                
                                                <div className="flex gap-1 items-center mt-2.5 text-maincolor font-bold text-xs">
                                                    <span>{product.price}</span>
                                                    <span className="text-[10px]">EGP</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchBox;