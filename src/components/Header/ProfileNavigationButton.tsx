import {useAuth} from "@/hooks/useAuth.tsx";
import {clsx} from "clsx";
import {CgProfile} from "react-icons/cg";
import AuthModal from "@/components/modals/AuthModal.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {toast} from "@/components/ui/use-toast.ts";


export const ProfileNavigationButton = () => {
    const{isLoginOpen, setIsLoginOpen}=useAuth()

    const [searchParams] = useSearchParams();

    const navigate = useNavigate()

    const {user, logOut} = useAuth();

    const handleLogOut = async () => {
        await logOut()
        toast({
            title: "Log out",
        })
    }

    if (!user) {
        return (
            <>
                <button className={clsx('ml-auto', !searchParams.get('search') ? 'lg:ml-0' : 'ml-auto')}
                        onClick={() => setIsLoginOpen(!isLoginOpen)}><CgProfile
                    size={35}/></button>
                <AuthModal isModalOpen={isLoginOpen}
                           onClose={() => setIsLoginOpen(!isLoginOpen)}/>
            </>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={clsx('ml-auto', !searchParams.get('search') ? 'lg:ml-0' : 'ml-auto')}><CgProfile
                size={35}/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => navigate('/profile/watchlist')}>WatchList</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile/ratings')}>Rating</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )


}