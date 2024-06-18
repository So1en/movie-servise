import Logo from '@/assets/logo.svg';
import { CgProfile } from "react-icons/cg";
import NavItem from "@/components/ui/nav-item.tsx";
import {NavLink} from "react-router-dom";
import SearchInput from "@/components/Header/SearchInput.tsx";


export default function Header() {
    return (
        <header className="bg-black text-teal-200 sticky p-4">
            <nav className="container flex gap-4 text-2xl items-center">
                <NavLink to='/' className="w-20 h-12">
                    <img src={Logo} alt="logo"/>
                </NavLink>
                <NavItem href={'/profile'}>Profile</NavItem>
                <NavItem href={'/catalog'}>Movie</NavItem>
                <NavItem href={'/catalog'}>Tv Shows</NavItem>
                <SearchInput/>
                <button><CgProfile size={35} /></button>
            </nav>
        </header>
    )
}