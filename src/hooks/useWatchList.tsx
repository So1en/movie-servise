import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addMovieToWatchlist, getWatchlist, removeMovieFromWatchlist} from "@/api/watchListService.ts";
import {Movie} from "@/types/Movie.ts";
import {useAuth} from "@/hooks/useAuth.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {useParams} from "react-router-dom";

export const useWatchList = () => {
    const client = useQueryClient();
    const {data: watchList} = useQuery({queryKey: ['watchList'], queryFn: () => getWatchlist(user.uid)});

    const {movieId} = useParams();

    const isMovieExistCheck = () => {
        if (!movieId || !watchList) return null;
        return watchList.some((movie) => movie?.id?.toString() == movieId);
    }

    const isMovieExist = isMovieExistCheck();

    const {user, setIsLoginOpen} = useAuth();

    const {
        mutateAsync: addMutate,
        isPending: adding
    } = useMutation({mutationFn: addMovieToWatchlist});

    const {mutateAsync: removeMutate, isPending: removing} = useMutation({mutationFn: removeMovieFromWatchlist});

    const onSavetoWatchlist = async (movie: Partial<Movie>) => {
        if(!user?.uid) {
            setIsLoginOpen(true)
            return;
        }
        try {
            await addMutate({userId: user.uid, movie})
            await client.invalidateQueries({queryKey: ['watchList']});
            toast({
                title: 'Movie added successfully',
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: 'Failed to save movie',
            })
        }
    }

    const deleteFromWatchlist = async (movie: Partial<Movie>) => {
        try {
            await removeMutate({userId: user.uid, movie})
            await client.invalidateQueries({queryKey: ['watchList']});
            toast({
                title: 'Movie removed successfully',
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: 'Failed to remove movie',
            })
        }
    }


    return {onSavetoWatchlist, deleteFromWatchlist, removing, adding, watchList, isMovieExist};
}
