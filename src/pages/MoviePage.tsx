import {Link, useLocation, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchingDetails} from "@/api/tmdbService.ts";
import {Button} from "@/components/ui/button.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {PlayCircle} from "lucide-react"
import {Avatar} from "@radix-ui/react-avatar";
import {AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import VideoModal from "@/components/modals/VideoModal.tsx";
import {useState} from "react";
import Gallery from "@/components/Gallery.tsx";
import SkeletonMoviePage from "@/components/SkeletonMoviePage.tsx";
import {useWatchList} from "@/hooks/useWatchList.tsx";
import {getMediaTypeFromPath} from "@/utils/getMovieTypeByUrl.ts";
import {clsx} from "clsx";
import DrawerRatting from "@/components/DrawerRatting.tsx";
import {formatMovie} from "@/utils/formatMovie.ts";


export default function MoviePage() {
    const {movieId} = useParams();
    const location = useLocation();
    const movieType = getMediaTypeFromPath(location.pathname)
    const isMovie = movieType === 'movie'


    const [selectedVideoKey, setSelectedVideoKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {onSavetoWatchlist, isMovieExist, deleteFromWatchlist, removing, adding} = useWatchList()

    const handleVideoModal = (videoKey: string) => {
        setSelectedVideoKey(videoKey);
        setIsModalOpen(true);
    }


    const {data: movieDetails, isError, isLoading, error} = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => fetchingDetails(movieType, Number(movieId)),
    })

    const formattedMovie = formatMovie(movieDetails, movieType)

    const handleWatchList = async () => {
        if (formattedMovie) {
            isMovieExist ? await deleteFromWatchlist(formattedMovie) : await onSavetoWatchlist(formattedMovie);
        }
        }

    if (isLoading) return <SkeletonMoviePage/>

    if (isError) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500 text-xl">Error: {error.message}</p>
            </div>
        )
    }

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-col md:flex-row bg-cover bg-left-top gap-7">
                <div className="md:w-1/3 w-full">
                    <img className="rounded-lg w-full"
                         src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
                         alt={movieDetails?.title}/>
                </div>

                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-start mb-4 text-foreground">
                        <div>
                            <h1 className="text-4xl font-bold">{movieDetails?.title || movieDetails?.name}</h1>
                            <p>Release
                                Date: {movieDetails?.release_date || movieDetails?.first_air_date} | {isMovie ? `Runtime: ${movieDetails?.runtime} minutes` : `Seasons: ${movieDetails?.number_of_seasons}`}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-semibold ">{movieDetails?.vote_average.toFixed(1)}/10</span>
                            <p className="text-sm">{movieDetails?.vote_count} votes</p>
                        </div>
                    </div>
                    <span className="text-primary font-thin">{movieDetails?.tagline}</span>
                    <br/>
                    <span className="text-2xl font-semibold">Overview</span>
                    <p className="text-foreground mb-4">{movieDetails?.overview}</p>

                    <div className="flex space-x-2 mb-4">
                        {movieDetails?.genres.map((genre) => (
                            <Link to={`/${movieType}?genre=${genre.name}&with_genres=${genre.id}`} key={genre.id}>
                                <Button
                                    key={genre.id}
                                    variant='outline'
                                    size="sm"
                                    className="rounded-full"
                                >
                                    {genre.name}
                                </Button>
                            </Link>
                        ))}
                    </div>


                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleWatchList()}
                            disabled={adding || removing}
                            className={clsx("bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg", {
                                'bg-red-400 hover:bg-red-500': isMovieExist,
                                'opacity-70': adding || removing
                            })}>
                            {isMovieExist ? 'Remove from' : 'Add to'} Watchlist
                        </button>
                        <DrawerRatting movie={formattedMovie}/>
                    </div>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Movie Information</h2>
                        <ul className="text-foreground space-y-2">
                            <li><strong>Status:</strong> {movieDetails?.status}</li>
                            {isMovie && <>
                                <li><strong>Budget:</strong> ${movieDetails?.budget.toLocaleString()}</li>
                                <li><strong>Revenue:</strong> ${movieDetails?.revenue.toLocaleString()}</li>
                            </>}
                            <li><strong>Production
                                Companies:</strong> {movieDetails?.production_companies.map((company) => (
                                company.name
                            )).join(', ')}
                            </li>
                            <li><strong>Language:</strong> {movieDetails?.original_language.toLocaleUpperCase()}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full mx-auto p-0 md:p-4">
                <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-2">Videos</h2>
                <Carousel className="w-full mx-auto">
                    <CarouselContent>
                        {movieDetails?.videos.results.map((video) => (
                            <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3 p-0">
                                <Card className="border-0 overflow-hidden" onClick={() => handleVideoModal(video.key)}>
                                    <CardContent className="p-0 ">
                                        <div className="relative flex flex-col">
                                            <img
                                                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                                alt={video.name}
                                                className="w-full object-cover rounded-lg"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <PlayCircle className="w-12 h-12 text-white opacity-80"/>
                                            </div>
                                            <div
                                                className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                                                {video.iso_639_1.toLocaleUpperCase()}
                                            </div>

                                        </div>
                                    </CardContent>
                                    {/*<div>*/}
                                    {/*    <h3 className="font-semibold">{video.name}</h3>*/}
                                    {/*    <div className="flex items-center text-sm text-muted-foreground">*/}
                                    {/*        <span>{new Date(video.published_at).toLocaleDateString()}</span>*/}
                                    {/*        <span className="mx-2">•</span>*/}
                                    {/*        <span>{video.type}</span>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </Card>

                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious variant='ghost'
                                      className='hover:bg-transparent hover:bg-gradient-to-r from-black/70 to-black/0 text-white hover:text-white'/>
                    <CarouselNext variant='ghost'
                                  className='hover:bg-transparent hover:bg-gradient-to-l from-black/70 to-black/0 text-white hover:text-white'/>
                </Carousel>
            </div>
            <div className="w-full mx-auto p-0 md:p-4">
                <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-2">Images</h2>


                <Gallery movieDetails={movieDetails}/>
            </div>

            <div className="w-full p-0 md:p-4">
                <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-2">Top cast</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movieDetails?.credits.cast.slice(0, 20).map((member, index) => (
                        <Card key={index} className="flex items-center space-x-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                             alt={member.name}
                                             className=''/>
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center space-x-2 p-2">
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-gray-500">{member.character}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="w-full p-0 md:p-4">
                <h2 className="text-2xl font-bold mb-4 border-l-4 border-yellow-400 pl-2">Recommendations</h2>
                <Carousel className="w-full">
                    <CarouselContent>
                        {movieDetails?.recommendations.results.slice(0, 9).map((movie) => (
                            <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3 p-0">
                                <Card className="overflow-hidden rounded-none border-none">
                                    <Link to={`/${movieType}/${movie.id}`}>
                                        <CardContent className="p-0 relative group">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                                alt={movie.title}
                                                className="w-full  object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                <h3 className="text-white font-semibold text-lg mb-2">{movie.title || movie.name}</h3>
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
            </div>
            <VideoModal videoKey={selectedVideoKey} isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    )
}