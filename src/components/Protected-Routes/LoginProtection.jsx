import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginProtection({ children }) {
    const { session, loading } = useAuth();
    if(loading) return <div className="min-h-screen flex justify-center items-center"><div className="w-12 h-12 border-4 border-maincolor border-t-transparent rounded-full animate-spin"></div></div>;
    // if user already logged in redirect him to his profile
    if(session) return <Navigate to="/profile" replace />;
    return children;
}

export default LoginProtection