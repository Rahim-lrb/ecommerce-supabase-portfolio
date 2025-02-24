import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    // Sign up new user
    const signUpNewUser = async (fullName, email, password) => {
        const { data, error } = await supabase.auth.signUp({ email: email.toLowerCase(), password });

        if (error) {
            console.error("Error signing up:", error);
            return { success: false, error: error.message };
        }

        if (!data.user) {
            return { success: true, message: "Check your email for verification." };
        }

        // Insert user into database
        const { error: insertError } = await supabase.from("users").insert([{ 
            id: data.user.id,  
            full_name: fullName,
            email: email.toLowerCase(),
        }]);

        if (insertError) {
            console.error("Error adding user to database:", insertError);
            return { success: false, error: insertError.message };
        }

        // Auto login after signup
        return signInUser(email, password);
    };

    // Sign in existing user
    const signInUser = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Sign-in error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    };

    // Google Sign-in
    const signInWithGoogle = async () => {
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin,
            },
        });
    
        if (error) {
            console.error("Google sign-in error:", error);
            return { success: false, error: error.message };
        }
    
        return { success: true, data };
    };
    

    // Sign out user
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    };


    

    // Track authentication state
    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth state changed:", session);
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => useContext(AuthContext);
