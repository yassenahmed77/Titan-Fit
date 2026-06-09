import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        // Fetch session on initial render
        async function getInitialSession() {
            const { data:{ session } } = await supabase.auth.getSession();
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        }
        getInitialSession();
        // Listen globally for any change 
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        return () => {
            subscription.unsubscribe();
        };
    },[]);

    const logout = async () => {
        await supabase.auth.signOut();
    }

    return(
        <AuthContext.Provider value={{session, user, loading, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}