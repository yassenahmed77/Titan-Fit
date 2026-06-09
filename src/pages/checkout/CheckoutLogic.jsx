import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import toast from "react-hot-toast";
import { supabase } from "../../lib/supabase";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../features/cartLogic/cartSlice";
import { useNavigate } from "react-router-dom";

function useCheckout() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const timerRef = useRef();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const subtotal = cartItems.reduce((acc, item) => {return acc + (item.price * item.quantity);}, 0);
    const shipping = subtotal > 1500 ? 0 : 50; // Free Shipping Over 1500 EGP
    const total = subtotal + shipping;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        fullname: user?.user_metadata?.fullname || "",
        phone: user?.phone || "",
        city: "",
        address: "",
    });
    useEffect(() => {
        if(user){
            // Updating user info
            setFormData({
                ...formData,
                fullname: formData.fullname || user.user_metadata?.full_name || "",
                phone: formData.phone || user.phone || ""
            })
        }
    },[user])
    // Update inputs value
    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    function handleSubmit(e){
        e.preventDefault();
        // Check if phone number is validate
        const phoneRegex = /^01[0125]\d{8}$/; // 012 345 678 99;
        if(!phoneRegex.test(formData.phone)){
            toast.error(
                <div>Phone number must be 11 digits and start with 010, 011, 012, or 015.</div>,
                { duration: 3000 }
            );
            return;
        }
        // Inserting user order in DB
        async function insertOrder() {
            try{
                setLoading(true);
                const { error } = await supabase.from("orders").insert({
                    user_id: user?.id || null,
                    guest_id: user?.id ? null : crypto.randomUUID(),
                    customer_name: formData.fullname,
                    customer_phone: formData.phone,
                    total_price: subtotal,
                    order_items: cartItems,
                    city: formData.city,
                    address: formData.address,
                });
                if(error) throw error;
                // Emptying inputs values
                setFormData({
                    fullname: "",
                    phone: "",
                    city: "",
                    address: "",
                });
                toast.success(
                    <div>Order Placed Successfully.</div>,
                    { duration:3000 }
                );
                // Clear submitted orders from redux
                dispatch(clearCart());
                // Navigating to home page
                timerRef.current = setTimeout(() => {
                    navigate('/', { replace: true })
                }, 3000);
            } catch(error){
                toast.error(
                    <div>{error.message}</div>,
                { duration: 3000 }
            );
            } finally{
                setLoading(false);
            }
        }
        insertOrder();
    }
    useEffect(() => {
        // Cleanup if user opens any page while navigating duration was still on 
        return () => {
            if(timerRef.current){
                clearTimeout(timerRef.current)
            }
        }
    },[]);
    return (
        {formData, setFormData, handleChange, handleSubmit, loading, cartItems, subtotal, total, shipping}
    )
}

export default useCheckout