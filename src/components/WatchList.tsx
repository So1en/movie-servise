import {useWatchList} from "@/hooks/useWatchList.tsx";
import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader} from "@/components/ui/card.tsx";



export default function WatchList() {
    const {watchList} = useWatchList()
    return (
        <>
            <h2 className='mb-5'>WatchList</h2>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6'>
            {watchList?.map((movie) => (
                <Link key={movie.id} to={`/${movie.media_type}/${movie.id}`}>
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
        </>

    )
}