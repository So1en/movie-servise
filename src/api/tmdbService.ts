import tmdbAxios from "@/api/tmdb.ts";
import {
    ResponseData,
    Movie,
    BaseMovie,
    GenreResponse,
    MovieParams,
    MovieDetails, MediaItem,
} from "@/types/Movie.ts";


export const fetchingMovieList = async(listType: string, params = {}) => {
    try {
        const response = await tmdbAxios.get<ResponseData<Movie>>(`/movie/${listType}`, {
            params: {
                ...params,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchingTrending = async (mediaType = 'all', timeWindow = 'day', params = {})  => {
    try {
        const response = await tmdbAxios.get<ResponseData<Movie>>(`/trending/${mediaType}/${timeWindow}`, {
            params: {
                ...params,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchingNowPlaying = async () => {
    try {
        const response = await tmdbAxios.get<ResponseData<BaseMovie>>(`/movie/now_playing`)
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export const fetchingGenres = async (type: string ) => {
    try {
        const response = await tmdbAxios.get<GenreResponse>(`/genre/${type}/list`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const fetchingMoviesByFilters = async (listType: string, params: MovieParams ) => {
    try {
        const response = await tmdbAxios.get<ResponseData<Movie>>(`/discover/${listType}`, {
            params: {
                ...params,
                "vote_count.gte": 300,
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchingDetails = async (itemType: string, id: number) => {
    try {
        const response = await tmdbAxios.get<MovieDetails>(`/${itemType}/${id}`, {
            params: {
                "append_to_response": 'credits,images,videos,recommendations',
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchingSearch = async (params = {}) => {
    try {
        const response = await tmdbAxios.get<ResponseData<MediaItem>>(`/search/multi`, {
            params: {
                ...params
            }
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

