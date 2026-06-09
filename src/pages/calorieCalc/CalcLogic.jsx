import { useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
function useCalorieCalculator() {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        activity: "",
        goal:""
    });
    const [submitted, setSubmitted] = useState(false);
    const [calcs, setCalcs] = useState({});
    // Inputs Values
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    // Calculate calories and update user profile on submit
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
        const result = calorieCalculation();
        const calories = Math.round(formData?.goal === "gain" ? result?.bulking?.goodBulk : result?.cutting?.goodCut);
        setCalcs(result);
        const {data: { session }} = await supabase.auth.getSession();
        const userId = session?.user?.id
        if(userId){
            const {error} = await supabase.from("profiles").update({
                age: formData.age,
                weight: formData.weight,
                height: formData.height,
                goal: formData.goal,
                calories
            }).eq("id", userId)
            if(error){
                toast.error(
                    <div>{error.message}</div>,{duration:4000}
                )
            }
        }
    }
    function calorieCalculation() {
        // Calculate BMR based on (gender & height & weight)
        let bmr;
        if (formData.gender === "male") {
            bmr = 10 * Number(formData.weight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) + 5;
        } else {
            bmr = 10 * Number(formData.weight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) - 161;
        }
        // Calculate maintenance based on bmr and activity level 
        const maintenance = bmr * Number(formData.activity);
        // Adjust calories based on the selected goal
            if(formData.goal === "gain"){
                return { bulking: {
                maintain: maintenance,
                smallbulk: maintenance + 200,
                goodBulk: maintenance + 800,
                dirtyBulk: maintenance + 1500,
                }}
            }
            else if(formData.goal === "lose"){
                return { cutting: {
                    maintain: maintenance,  
                    smallCut: maintenance - 200,
                    goodCut: maintenance - 500,
                    aggresiveCut: maintenance - 1000,
                }}
            }
    }
    return{formData, submitted, setSubmitted, calcs, handleChange, handleSubmit}
}

export default useCalorieCalculator