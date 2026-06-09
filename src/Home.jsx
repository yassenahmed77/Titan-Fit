import Categories from "./components/Categories"
import Landing from "./components/Landing"
import Products from "./pages/products/Products"
import Features from "./components/Features"
import CalcForm from "./pages/calorieCalc/CalcForm"
import ScrollReveal from "./components/ScrollReveal"

function Home() {
  return (
    <>
      <Landing/>
      
      <ScrollReveal variant="fade-up" duration="duration-1000">
        <Features/>
      </ScrollReveal>
      
      <ScrollReveal variant="fade-up" duration="duration-1000">
        <Categories/>
      </ScrollReveal>
      
      <ScrollReveal variant="fade-up" duration="duration-1000">
        <Products/>
      </ScrollReveal>
      
      <ScrollReveal variant="fade-up" duration="duration-1000">
        <CalcForm/>
      </ScrollReveal>
    </>
  )
}

export default Home