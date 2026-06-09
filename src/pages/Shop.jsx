import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "./products/ProductCard";
import ScrollReveal from "../components/ScrollReveal";
import ProductCardSkeleton from "./products/ProductCardSkeleton";

function Shop() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getAllProducts() {
            try {
                const { data, error } = await supabase.from("supplements").select('*');
                if (error) throw error;
                setProducts(data);
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        }
        getAllProducts();
    }, []);

    return (
        <section className="min-h-screen pt-36 pb-20 font-montserrat">
            <div className="container pt-5">
                {/* Header */}
                <ScrollReveal variant="fade-down" duration="duration-700">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight uppercase">Our Shop</h1>
                        <p className="text-slate-500 text-sm sm:text-base mt-3">Browse our full range of premium supplements and gym wear to support your journey.</p>
                    </div>
                </ScrollReveal>
                {/* Error */}
                {errorMessage && !loading && (
                    <p className="error">{errorMessage}</p>
                )}
                {/* Loading */}
                {loading && !errorMessage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
                        {[...Array(6)].map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {!loading && !errorMessage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden">
                        {products.map((item, index) => {
                            // Creating delay duration for each item 
                            const delays = ["", "delay-75", "delay-100", "delay-150", "delay-200", "delay-300"];
                            // Restart duration after 6th item 
                            const delayClass = delays[index % delays.length];
                            return (
                                <ScrollReveal key={item.id || index} variant="fade-up" delay={delayClass} duration="duration-700">
                                    <ProductCard item={item} />
                                </ScrollReveal>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Shop;
