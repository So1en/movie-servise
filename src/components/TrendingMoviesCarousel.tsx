import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {useQuery} from "@tanstack/react-query";
import {fetchingNowPlaying} from "@/api/tmdbService.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import Autoplay from "embla-carousel-autoplay"
import {Link} from "react-router-dom";
import {Skeleton} from "@/components/ui/skeleton.tsx";

    export default function TrendingMoviesCarousel() {
    const {data: trendingMovies, isLoading} = useQuery({
        queryKey: ["NowPlaying"],
        queryFn: () => fetchingNowPlaying()
    });

    if (isLoading) {
        return (
            <div className="flex space-x-4 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-1/3"/>
                ))}
            </div>
        )
    }

        if (!trendingMovies || trendingMovies.results.length === 0) return null;


        return (
            <Carousel plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]} opts={{
            align: "start",
            loop: true,
        }} className="w-full mx-auto">
            <CarouselContent>
                {trendingMovies.results.map((movie) => (
                    <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3 p-0">
                        <Card className="overflow-hidden rounded-none border-none">
                            <Link to={`/movie/${movie.id}`}>
                            <CardContent className="p-0 relative group">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                    alt={movie.title}
                                    className="w-full  object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <h3 className="text-white font-semibold text-lg mb-2">{movie.title}</h3>
                                </div>
                            </CardContent>
                            </Link>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant='ghost'
                              className='hover:bg-transparent hover:bg-gradient-to-r from-black/70 to-black/0 text-white hover:text-white'/>
            <CarouselNext variant='ghost'
                          className='hover:bg-transparent hover:bg-gradient-to-l from-black/70 to-black/0 text-white hover:text-white'/>
        </Carousel>
    );
}
