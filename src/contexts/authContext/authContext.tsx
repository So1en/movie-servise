import {createContext, Dispatch, SetStateAction, useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage.tsx";
import {signOut, User} from "firebase/auth"
import {auth} from "@/firebase.ts";

interface IAuthContext {
    user: User,
    setCurrentUser: (user: User) => void,
    logOut: () => Promise<void>,
    isLoginOpen: boolean,
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<IAuthContext|undefined>(undefined);

type AuthContextType = {
    children: React.ReactNode;
}

export const AuthContextProvider = ({children}: AuthContextType) => {
    const {storageValue, setLocalStorage} = useLocalStorage('user')
    const [user, setUser] = useState(storageValue)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const setCurrentUser = (user: User): void => {
        setUser(user)
        setLocalStorage(user);
    }
    const logOut = async () => {
        setUser(undefined)
        await signOut(auth);
        localStorage.clear();
    }
    return (
        <AuthContext.Provider value={{user, setCurrentUser, logOut, isLoginOpen, setIsLoginOpen}}>
            {children}
        </AuthContext.Provider>
    )
}