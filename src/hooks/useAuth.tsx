import {useContext} from "react";
import {AuthContext} from "@/contexts/authContext/authContext.tsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within a AuthProvider');
    return context;
}