import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Button} from "@/components/ui/button.tsx";
import {Slider} from "@/components/ui/slider.tsx";
import {useForm, Controller} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea"
import {useRattedList} from "@/hooks/useRattedList.tsx";
import {Movie} from "@/types/Movie.ts";
import {IRattedMovie} from "@/api/ratingService.tsx";
import {format} from "date-fns";
import {useEffect, useRef} from "react";
import {clsx} from "clsx";

type Props = {
    movie: Partial<Movie> | null;
}


export default function DrawerRatting({movie}: Props) {
    const {handleSubmit, control, register, reset} = useForm(
        {defaultValues: {rate: [50], feedback: ''}}
    )

    const drawerCloseRef = useRef<HTMLButtonElement>(null);

    const {isUserLogin, onSavetoRattedList, currentRatedMovie, adding, updating} = useRattedList()

    const onSubmit = async (data: { rate: number[], feedback: string }) => {
        const userExist = isUserLogin()
        if (userExist) {
            const ratedMovie = {
                rate: data.rate[0],
                feedback: data.feedback, ...movie,
                date: format(new Date(), "yyyy-MM-dd HH:mm")
            };
            await onSavetoRattedList(ratedMovie as IRattedMovie, !!currentRatedMovie )
        }
        drawerCloseRef.current?.click();
    }

    useEffect(() => {
        if (currentRatedMovie) reset({rate: [currentRatedMovie.rate], feedback: currentRatedMovie.feedback});
    }, [currentRatedMovie, reset]);

    return (
        <Drawer>
            <DrawerTrigger>
                <button
                    className={clsx("bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg", {"opacity-70" : adding || updating})}>{currentRatedMovie?.rate ? `Rate: ${currentRatedMovie.rate}` : "Rate"}
                </button>
            </DrawerTrigger>
            <DrawerContent className="items-center">
                <form className="p-5 max-w-3xl w-full" onSubmit={handleSubmit(onSubmit)}>
                    <DrawerHeader>
                        <DrawerTitle className='text-center text-3xl'>Rating</DrawerTitle>
                        <DrawerDescription className='text-center text-2xl'>What do you think
                            about {movie?.title}?</DrawerDescription>
                    </DrawerHeader>
                    <Controller
                        control={control}
                        name='rate'
                        render={({field: {onChange, value,}}) => (
                            <>
                                <p className='text-center text-5xl font-bold tracking-tighter mb-5'>{value[0]}</p>
                                <Slider
                                    value={value}
                                    max={100}
                                    step={1}
                                    onValueChange={onChange}
                                />
                            </>
                        )}/>
                    <Textarea className='mt-5' {...register('feedback', {maxLength: 300})}
                              placeholder="Type your feedback here."/>
                    <DrawerFooter className='flex-row justify-center gap-'>
                        <Button type='submit' className='inline-block' variant="secondary" size='lg'>Save</Button>
                        <DrawerClose ref={drawerCloseRef}>
                            <Button type='button' variant="outline" size='lg'>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}

