
export interface ResponseData<T> {
    page: number;
    total_pages: number;
    total_results: number;
    results: T[];
}

export interface BaseMovie {
    id: number;
    title?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date?: string;
    vote_average: number;
    genre_ids: number[];
}

export interface Movie extends BaseMovie{
    adult: boolean;
    media_type: string;
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
    first_air_date: string;
    name?: string;
}

export interface Genre {
    id: string;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface MovieParams {
    with_genres: string,
    sort_by: string,
    genre?: string,
    page?: number
}

export interface MovieDetails {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: VideoResponse;
    credits: CastResponse;
    images: MovieImagesResponse;
    recommendations: RecMovieResponse;
    name?: string;
    first_air_date?: string;
    number_of_seasons?: number;
}


interface RecMovie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string;
}

interface RecMovieResponse {
    page: number;
    results: RecMovie[];
    total_pages: number;
    total_results: number;
}


export interface CastResponse {
    cast: Cast[];
}


interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

interface Result {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

interface VideoResponse {
    id: number;
    results: Result[];
}

interface Image {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface Logo extends Image {
    iso_639_1: string;  // Unlike other images, logos have a defined language code.
}

interface MovieImagesResponse {
    backdrops: Image[];
    id: number;
    logos: Logo[];
    posters: Image[];
}


interface ProductionCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
}

// interface CreatedBy {
//     id: number;
//     credit_id: string;
//     name: string;
//     original_name: string;
//     gender: number;
//     profile_path: string | null;
// }
//
// interface LastEpisodeToAir {
//     id: number;
//     name: string;
//     overview: string;
//     vote_average: number;
//     vote_count: number;
//     air_date: string;
//     episode_number: number;
//     episode_type: string;
//     production_code: string | null;
//     runtime: number;
//     season_number: number;
//     show_id: number;
//     still_path: string | null;
// }
//
// interface Network {
//     id: number;
//     logo_path: string | null;
//     name: string;
//     origin_country: string;
// }
//
// interface Season {
//     air_date: string;
//     episode_count: number;
//     id: number;
//     name: string;
//     overview: string;
//     poster_path: string | null;
//     season_number: number;
//     vote_average: number;
// }

export interface MediaItem {
    backdrop_path?: string | null;
    id: number;
    name?: string;
    title?: string;
    original_name?: string;
    original_title?: string;
    overview: string;
    poster_path?: string | null;
    media_type: "tv" | "movie" | "person";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    release_date?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
    known_for_department?: string;
    gender?: number;
    profile_path?: string | null;
}



