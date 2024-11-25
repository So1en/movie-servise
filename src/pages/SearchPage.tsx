import { useSearchParams} from "react-router-dom";
import SearchCatalog from "@/components/SearchCatalog.tsx";
import SearchInput from "@/components/Header/SearchInput.tsx";

export default function SearchPage() {
    const [searchParams] = useSearchParams();

    const name = searchParams.get("search")

    return (
        <>
        <h3>
            Search '{name}'
        </h3>
            <SearchInput className='w-full mt-2' defaultValue={name}/>
        <SearchCatalog name={name}/>
        </>
    )
}