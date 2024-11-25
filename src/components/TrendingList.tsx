import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchingTrending} from "@/api/tmdbService.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Link, useNavigate} from "react-router-dom";

export default function TrendingList() {
    const [timeWindow, setTimeWindow] = useState("day")

    const navigate = useNavigate();

    const {data: trendingMovies, isLoading, isError, error} = useQuery({
        queryKey: ["TrendingMovies", {timeWindow}],
        queryFn: () => fetchingTrending("movie", timeWindow),
        refetchOnWindowFocus: false,
    })

    const {data: trendingTVShows} = useQuery({
        queryKey: ["TrendingTVShows", timeWindow],
        queryFn: () => fetchingTrending("tv", timeWindow),
        refetchOnWindowFocus: false,
    })


    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 gap-4">
                    {[...Array(2)].map((_, index) => (
                        <Skeleton key={index} className="h-[700px] w-full"/>
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
        <div className="md:row-span-1 md:col-span-1 row-span-2 col-span-4 container mx-auto p-4">
            <Tabs value={timeWindow} onValueChange={setTimeWindow} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="day">Today</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                </TabsList>
            </Tabs>
            <div className="grid grid-cols-1  gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Trending Movies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {trendingMovies?.results.map((movie) => (
                                <Link to={`/movie/${movie.id}`} key={movie.id} className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">{movie.title}</span>
                                    <span className="text-xs text-muted-foreground">
                    ({new Date(movie?.release_date ?? '').getFullYear()})
                  </span>
                                </Link>
                            ))}
                        </ul>
                        <Button onClick={() => navigate('movie')} variant="link" className="mt-4 p-0 text-foreground">
                            See all movies
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Trending TV Shows</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            {trendingTVShows?.results.map((show) => (
                                <Link to={`/tv/${show.id}`} key={show.id} className="flex items-center space-x-2">
                                    <span className="text-sm font-medium">{show?.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                         ({new Date(show?.first_air_date ?? '').getFullYear()})
                                    </span>
                                </Link>
                            ))}
                        </ul>
                        <Button onClick={() => navigate('tv')} variant="link" className="mt-4 p-0 text-foreground">
                            See all TV shows
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}