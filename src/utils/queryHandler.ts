import {MovieParams} from "@/types/Movie.ts";

export const handleFilters = (searchParams:  URLSearchParams, removeGenre: boolean = true): MovieParams => {
    const query = Object.fromEntries([...searchParams]);
    if (removeGenre) delete query.genre;
    return {...query, sort_by : (query.sort_by ? query.sort_by + '.desc' : 'popularity.desc')} as MovieParams;
}