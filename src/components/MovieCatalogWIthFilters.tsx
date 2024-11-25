import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchingMoviesByFilters} from "@/api/tmdbService.ts";

import {Skeleton} from "@/components/ui/skeleton.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import useTabPagination from "@/hooks/useTabPagination.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {handleFilters} from "@/utils/queryHandler.ts";
import {getMediaTypeFromPath} from "@/utils/getMovieTypeByUrl.ts";



export default function MovieCatalogWIthFilters() {
    const {currentPage, handlePageChange, ref} = useTabPagination()


    const [searchParams] = useSearchParams();
    const query = handleFilters(searchParams)

    const movieType = getMediaTypeFromPath(location.pathname)

    const {data: movieList, isLoading, isError, error} =useQuery({
        queryKey: ['movieListWithFilters', searchParams.toString(), currentPage, movieType],
        queryFn: () => fetchingMoviesByFilters(movieType, {...query, page: currentPage}, ),
    })


    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <Skeleton className="w-[250px] h-[20px] mb-4"/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(20)].map((_, index) => (
                        <Skeleton key={index} className="h-[200px] w-full"/>
                    ))}
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500 text-xl">Error: {error.message}</p>
            </div>
        )
    }

    return (
        <div ref={ref} className="col-span-4 md:col-span-3 container p-4">
            <div  className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6'>
                {movieList?.results.map((movie) => (
                    <Link key={movie.id} to={`/${movieType}/${movie.id}`}>
                    <Card key={movie.id} className='h-full'>
                        <CardContent>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                 alt={movie.title || movie.name}/>
                        </CardContent>
                        <CardHeader>
                            {movie.title || movie.name}
                            <CardDescription>
                                ({new Date(movie?.release_date || movie?.first_air_date).getFullYear()})
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    </Link>
                ))}
            </div>
            <CustomPagination currentPage={currentPage} handlePageChange={handlePageChange}/>
        </div>
    )
}