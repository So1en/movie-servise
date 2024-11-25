import {ReactNode} from "react";
import {useAuth} from "@/hooks/useAuth.tsx";
import {Navigate} from "react-router-dom";

type Props = {
    children: ReactNode;
}

export const ProtectedRoute = ({children}: Props) => {
    const {user} = useAuth()
    if (!user)  return <Navigate to="/" replace />;
        return (
            children
        )
}