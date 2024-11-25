import FilmsCatalog from "@/components/FilmsCatalog.tsx";
import TrendingList from "@/components/TrendingList.tsx";
import TrendingMoviesCarousel from "@/components/TrendingMoviesCarousel.tsx";

export default function HomePage() {


    return (
        <>
            <TrendingMoviesCarousel/>
            <div className='grid grid-cols-4'>
                <FilmsCatalog/>
                <TrendingList/>
            </div>
        </>

    )
}