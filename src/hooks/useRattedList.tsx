import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth.tsx";
import {toast} from "@/components/ui/use-toast.ts";
import {getRattedList, IRattedMovie, rateMovie, updateRattedMovie} from "@/api/ratingService.tsx";
import {useParams} from "react-router-dom";

export const useRattedList = () => {
    const client = useQueryClient();
    const {data: rattedList} = useQuery({queryKey: ['rattedList'], queryFn: () => getRattedList(user.uid)});

    const {user, setIsLoginOpen} = useAuth();

    const {movieId} = useParams();

    const {
        mutateAsync: addMutate,
        isPending: adding,
    } = useMutation({mutationFn: rateMovie});

    const {mutateAsync: updateMutate, isPending: updating} = useMutation({mutationFn: updateRattedMovie});

    const isUserLogin = () => {
        if(!user?.uid) {
            setIsLoginOpen(true)
            return;
        } return true
    }

    const getCurrentRatedMovie = () => {
        if (!movieId || !rattedList) return null;
        return rattedList.find((movie) => movie.id?.toString() === movieId)
    }

    const currentRatedMovie = getCurrentRatedMovie();

    const onSavetoRattedList = async (movie: IRattedMovie, isEdit: boolean = false ) => {
        try {
            isEdit ? await updateMutate({userId: user.uid, movie}) : await addMutate({userId: user.uid, movie})
            await client.invalidateQueries({queryKey: ['rattedList']});
            toast({
                title: 'Movie ratted successfully',
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: 'Failed to rate movie',
            })
        }
    }


    return {onSavetoRattedList, adding, updating, rattedList, isUserLogin, currentRatedMovie};
}
