import {BiSearchAlt2} from "react-icons/bi";
import {useState} from "react";
import {clsx} from "clsx";

export default function SearchInput() {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="ml-auto relative flex items-center">
            <input
                className={clsx("border rounded bg-black font-medium font text-sm p-1.5 w-[250px] transition-all duration-300 ",
                    isActive || "w-0 opacity-0 "
                )}
                type="text"
                placeholder="Search movies..."
                onChange={(e) => {
                    console.log(e.target.value);
                }}/>
            <button className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setIsActive(!isActive)}>
                <BiSearchAlt2 size={30}/></button>
        </div>
    )
}
