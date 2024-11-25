import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchingMovieList} from "@/api/tmdbService.ts";

import {Skeleton} from "@/components/ui/skeleton.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import useTabPagination from "@/hooks/useTabPagination.tsx";
import {Link} from "react-router-dom";

export default function FilmsCatalog() {
    const {
        listType,
        currentPage,
        handlePageChange,
        handleChange,
        ref
    } = useTabPagination()

    const {data: movieList, isError, isLoading , error} = useQuery({
        queryKey: ["filmsCatalog", listType, currentPage],
        queryFn: () => fetchingMovieList(listType, {page: currentPage}),
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return (
            <div className="grid lg:grid-cols-4 col-span-3 mt-5  md:grid-cols-3 grid-cols-2 gap-6">
                {Array.from({length: 12}).map((_, index) => (
                    <Card key={index} className="h-full">
                        <CardContent className="p-0">
                            <Skeleton className="h-[300px] w-full"/>
                        </CardContent>
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4 mb-2"/>
                            <Skeleton className="h-4 w-1/2"/>
                        </CardHeader>
                    </Card>))}
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
            <Tabs value={listType} onValueChange={handleChange} className="mb-6">
                <TabsList className="grid w-full grid-cols-3 ">
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="top_rated">Top rated</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6'>
                {movieList?.results.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <Card key={movie.id} className='h-full'>
                            <CardContent className='p-0'>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                     alt={movie.title}
                                     className=''/>
                            </CardContent>
                            <CardHeader>
                                {movie.title}
                                <CardDescription>
                                    ({new Date(movie?.release_date ?? '').getFullYear()})
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