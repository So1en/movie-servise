import Logo from '@/assets/logo.svg';
import { NavLink, useNavigate, useSearchParams} from "react-router-dom";
import SearchInput from "@/components/Header/SearchInput.tsx";
import Sidebar from '@/components/Header/Sidebar.tsx'
import ThemeButton from "@/components/mode-toggle.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchingGenres} from "@/api/tmdbService.ts";
import {
    ListItem,
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import {ProfileNavigationButton} from "@/components/Header/ProfileNavigationButton.tsx";



export default function Header() {



    const {data: movieGenres} = useQuery({
        queryKey: ['movieGenre'],
        queryFn: () => fetchingGenres("movie")
    })
    const {data: tvGenres} = useQuery({
        queryKey: ['tvGenre'],
        queryFn: () => fetchingGenres("tv")
    })

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();



    return (
        <>
            <header className="bg-transparent text-foreground sticky p-4 z-50">
                <nav className="container flex gap-4 text-2xl items-center ">
                    <Sidebar tvGenres={tvGenres?.genres} movieGenres={movieGenres?.genres}/>
                    <NavLink to='/' className="w-20 h-12">
                        <img src={Logo} alt="logo"/>
                    </NavLink>
                    <NavigationMenu className='hidden lg:flex '>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger onClick={() => navigate("/movie")}>
                                    Movies
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 w-full md:w-[400px] lg:w-[500px] lg:grid-cols-4">
                                        {movieGenres?.genres.map(genre => (
                                            <ListItem
                                                onClick={() => navigate(`/movie?genre=${genre.name}&with_genres=${genre.id}`)}
                                                key={genre.id}>
                                                {genre.name}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger onClick={() => navigate("/tv")}>
                                    TV shows
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='z-1'>
                                    <ul className="grid gap-3 p-6 w-full md:w-[400px] lg:w-[500px] lg:grid-cols-4">
                                        {tvGenres?.genres.map(genre => (
                                            <ListItem
                                                onClick={() => navigate(`/tv?genre=${genre.name}&with_genres=${genre.id}`)}
                                                key={genre.id}>
                                                {genre.name}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    {!searchParams.get('search') && <SearchInput className='hidden lg:flex'/>}
                    <ProfileNavigationButton/>
                    <ThemeButton/>
                </nav>
            </header>

        </>
    )
}