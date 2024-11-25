import {arrayUnion, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "@/firebase.ts";
import {Movie} from "@/types/Movie.ts";

export interface IRattedMovie extends Partial<Movie> {
    date: string,
    rate: number,
    feedback: string,
    media_type: string
}

type Props = {
    userId: string,
    movie: IRattedMovie,
}

export const rateMovie = async ({userId, movie}: Props) => {
    const userRef = doc(db, "users", userId);
    try {
        await updateDoc(userRef, {
            rattedList: arrayUnion(movie)
        });
        console.log("Movie ratted successfully");
    } catch (error) {
        console.error("Error ratting movie:", error);
    }
};

export const updateRattedMovie = async ({ userId, movie }: Props) => {
    const userRef = doc(db, "users", userId);

    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedRattedList = (userData.rattedList || []).map((item: IRattedMovie) =>
                item.id === movie.id ? movie : item
            );

            await updateDoc(userRef, {
                rattedList: updatedRattedList,
            });
        }
    } catch (error) {
        console.error("Error updating ratted movie:", error);
    }
};

export const getRattedList = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            return data.rattedList as IRattedMovie[] || [];
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching ratted list:", error);
        return [];
    }
};
