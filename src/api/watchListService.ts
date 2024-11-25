import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import {db} from "@/firebase.ts";
import {Movie} from "@/types/Movie.ts";

type Props = {
    userId: string,
    movie: Partial<Movie>,
}

export const addMovieToWatchlist = async ({userId, movie}: Props) => {
    const userRef = doc(db, "users", userId);
    try {
        await updateDoc(userRef, {
            watchlist: arrayUnion(movie)
        });
        console.log("Movie added to watchlist successfully");
    } catch (error) {
        console.error("Error adding movie to watchlist:", error);
    }
};

export const removeMovieFromWatchlist = async ({userId, movie}: Props) => {
    const userRef = doc(db, "users", userId);

    try {
        await updateDoc(userRef, {
            watchlist: arrayRemove(movie)
        });
        console.log("Movie removed from watchlist successfully");
    } catch (error) {
        console.error("Error removing movie from watchlist:", error);
    }
};

export const getWatchlist = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            return data.watchlist as Partial<Movie>[] || []; // Return watchlist or an empty array if it doesn't exist
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return [];
    }
};
