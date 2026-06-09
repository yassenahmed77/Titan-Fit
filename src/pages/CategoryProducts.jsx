import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabase";
import ProductCard from "./products/ProductCard";
import ProductCardSkeleton from "./products/ProductCardSkeleton";
import ScrollReveal from "../components/ScrollReveal";

function CategoryProducts() {
    // Catch Category Name From Search Bar
    const cat = useParams();
    const catName = cat.categoryName;
    const [catProducts, setCatProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCatProducts() {
            try{
                const {data,error} = await supabase.from("supplements").select('*').eq('category',catName);
                if(error) throw error;
                setCatProducts(data);
            } catch(err){
                setErrorMessage(err.message)
            } finally{
                setLoading(false);
            }
        }
        getCatProducts();
    },[]);

    return (
        <div className="mt-40 container pb-10">
            {/* Loading */}
            {loading && !errorMessage && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-hidden">
                    {[...Array(6)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}
            {/* Error */}
            {!loading && errorMessage && <p className="error">{errorMessage}</p>}

            {!loading && !errorMessage && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-hidden">
                    {catProducts.map((item, index) => {
                        // Creating delay duration for each item 
                        const delays = ["", "delay-75", "delay-100", "delay-150", "delay-200", "delay-300"];
                        // Restart duration after 6th item 
                        const delayClass = delays[index % delays.length];
                        return(
                            <ScrollReveal key={item.id || index} variant="fade-up" delay={delayClass} duration="duration-700">
                                <ProductCard item={item} />
                            </ScrollReveal>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default CategoryProducts