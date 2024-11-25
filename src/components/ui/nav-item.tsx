import {NavLink} from "react-router-dom";
import {ReactNode} from "react";

type Props = {
    href: string;
    children: ReactNode;
}

export default function NavItem({href, children}: Props) {
    return (
            <NavLink to={href} className="hover:bg-accent hover:text-foreground p-1.5 rounded-xl">{children}</NavLink>
    )
}