import {useQuery} from "@tanstack/react-query";
import {fetchingSearch} from "@/api/tmdbService.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";
import useTabPagination from "@/hooks/useTabPagination.tsx";
import CustomPagination from "@/components/CustomPagination.tsx";
import {Link} from "react-router-dom";
import {TabsList, TabsTrigger, Tabs} from "@/components/ui/tabs.tsx";

type Props = {
    name: string | null
}

export default function SearchCatalog({name}: Props) {
    const {mediaType, handleSearchChange, currentPage, handlePageChange} = useTabPagination()

    const {data: resultList, isError, isLoading, error} = useQuery({
        queryKey: ['searchCatalog', name, currentPage],
        queryFn: () => fetchingSearch({"query": name, 'page': currentPage.toString()}),
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
        <div className="col-span-4 md:col-span-3 container p-4">
            <Tabs value={mediaType} onValueChange={handleSearchChange} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="movie">Movie</TabsTrigger>
                    <TabsTrigger value="tv">TV</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6'>
                {resultList?.results.filter(item => item.media_type == mediaType).map((movie) => (
                    <Link key={movie.id} to={`/${mediaType}/${movie.id}`}>
                        <Card>
                            <CardContent>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                     alt={movie.title ?? movie.name}/>
                            </CardContent>
                            <CardHeader>
                                {movie.title ?? movie.name}
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