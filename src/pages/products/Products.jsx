import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import ProductsSlider from "./ProductsSlider";
import ProductCardSkeleton from "./ProductCardSkeleton";

function Products() {
    const [supplements,setSupplements] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProducts() {
            try{
                const {data,error} = await supabase.from("supplements").select('*');
                if(error) throw error;
                setSupplements(data);
            } catch(err){
                setErrorMessage(err.message)
            } finally{
                setLoading(false);
            }
        }
        getProducts();
    },[]);

    return (
        <section className="container space" id="products">
            {/* Error */}
            {errorMessage && !loading && (<p className="error">{errorMessage}</p>)}
            {/* Loading */}
            {!errorMessage && loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 !p-10">
                    {[...Array(4)].map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))}
                </div>
            )}
            {/* Header and all products */}
            {!errorMessage && !loading && (
                <>
                    <div className="flex flex-col mb-5">
                        <div>
                            <h1 className="text-2xl sm:text-4xl font-semibold mb-2.5">All Products</h1>
                            <p className="text-[13px] sm:text-[15px] text-gray-700">Discover our premium selection of supplements & clothes tailored to your fitness goals.</p>
                        </div>
                    </div>
                    <ProductsSlider products={supplements}/>
                </>
            )}
        </section>
    )
}

export default Products