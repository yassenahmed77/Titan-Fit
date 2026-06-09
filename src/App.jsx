import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import ProfileProtection from "./components/Protected-Routes/ProfileProtection"
import LoginProtection from "./components/Protected-Routes/LoginProtection";
import { lazy, Suspense } from "react";
import LoadingSuspense from "./components/LoadingSuspense";
const ProductsDetails = lazy(() => import("./pages/products/ProductsDetails"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const Cart = lazy(() => import("./pages/Cart"));
const Calc = lazy(() => import("./pages/calorieCalc/Calc"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Shop = lazy(() => import("./pages/Shop"));
const NotFound = lazy(() => import("./pages/NotFound"));
function App() {
  return (
    <main>
      <Header/>
      <ScrollToTop/>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: 'rgba(15, 23, 42, 0.95)',
              color: '#f8fafc',
              border: '1px solid rgba(78, 115, 138, 0.3)',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              maxWidth: '420px',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              fontFamily: '"Montserrat", sans-serif',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#0f172a',
            },
          },
        }}
      />
      <Suspense fallback={<LoadingSuspense/>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products/:productId" element={<ProductsDetails/>}/>
          <Route path="/categories/:categoryName" element={<CategoryProducts/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/service" element={<Calc/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/profile" element = {
            <ProfileProtection>
              <Profile/>
            </ProfileProtection>
          } />
          <Route path="/login" element={
            <LoginProtection>
              <Login/>
            </LoginProtection>
          }/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer/>
    </main>
  )
}

export default App
