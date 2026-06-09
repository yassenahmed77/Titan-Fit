import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from 'react-router-dom';
import { CircleArrowRight } from 'lucide-react';

function Categories() {
    const [cat,setCat] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getCategories(){
            try{
                const {data,error} = await supabase.from("categories").select('*');
                if(error) throw error;
                setCat(data);
            } catch(err) {
                setErrorMessage(err.message)
            } finally{
                setLoading(false);
            }
        }
        getCategories();
    },[]);

    return (
            <section className="container space">
                <div className="flex flex-col">
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-semibold mb-2.5">Shop by Category</h1>
                        <p className="text-[13px] sm:text-[15px] text-gray-700">Discover our premium selection of supplements tailored to your fitness goals.</p>
                    </div>
                    <a href="#products" className="group flex gap-2 justify-end font-medium mt-5 transition-all duration-300 hover:-translate-y-1">View All Products <CircleArrowRight className="arrow-animation"/></a>
                </div>
                {loading && !errorMessage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                        {[...Array(3)].map((_,i) => {
                            return(
                                <div key={i} className="h-[400px] bg-gray-300 rounded-2xl animate-pulse"></div>
                            )
                        })}
                    </div>
                )}
                {!loading && errorMessage && <p className="error">{errorMessage.toUpperCase()}.</p>}
                {/* Navigating to all category products */}
                {!loading && !errorMessage && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'>
                        {cat.map((item) => {
                            return(
                                <Link to={`/categories/${item.category.replaceAll(" ", "-").toLowerCase()}`} key={item.category} className="group relative block w-full h-[400px] rounded-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: `url(${item.img})`}}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute inset-0 flex items-end">
                                        <div className="z-10 text-white mb-5 ml-7 font-bold">
                                            <h1 className="text-3xl translate-y-3 group-hover:translate-y-0 transition-all duration-300">{item.category.replaceAll("-"," ").toUpperCase()}</h1>
                                            <span className="flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-1.5 transition-all duration-300">Explore <CircleArrowRight className="arrow-animation"/></span>
                                        </div>
                                    </div>
                                </Link>
                            )
                    })}
                    </div>
                )}
            </section>
    )
}

export default Categories


