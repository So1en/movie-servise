import Filters from "@/components/Filters.tsx";
import MovieCatalogWIthFilters from "@/components/MovieCatalogWIthFilters.tsx";


export default function MoviesPage() {

    return (
        <>
            <Filters/>
            <MovieCatalogWIthFilters />
        </>

    )
}