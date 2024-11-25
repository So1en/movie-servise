import {Movie} from "@/types/Movie.ts";

export const formatMovie = (movieDetails?: Partial<Movie>, movieType?: string) => {
    if (movieDetails) {
        return  {
            title: movieDetails.title || movieDetails.name,
            id: movieDetails.id,
            media_type: movieType,
            poster_path: movieDetails.poster_path,
            release_date: movieDetails.release_date || movieDetails.first_air_date,
        }
    } return null;
}