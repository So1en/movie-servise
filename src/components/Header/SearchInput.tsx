import {BiSearchAlt2} from "react-icons/bi";
import {useForm} from "react-hook-form";

import {cn} from "@/lib/utils"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {clsx} from "clsx";

type SearchInputProps = {
    className?: string,
    onSubmitSuccess?: () => void,
    defaultValue?: string | null
}

type SearchForm = {
    search: string,

}


export default function SearchInput({className, onSubmitSuccess, defaultValue}: SearchInputProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<SearchForm>({defaultValues: {search: defaultValue ?? ''}})

    useEffect(() => {
        if (defaultValue) reset({search: defaultValue})
    }, [defaultValue, reset]);

    const onSubmit = ({search}: SearchForm) => {
        navigate(`/search?search=${search}`);
        reset();
        onSubmitSuccess && onSubmitSuccess();
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("ml-auto w-[250px] relative items-center", className)}>
            <input
                className={clsx("border rounded bg-background font-medium font text-sm p-1.5 w-full", errors.search && '-red-950' )}
                type="text"
                placeholder="Search movies..."
                {...register("search", {required: true}) }
            />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
                <BiSearchAlt2 size={30}/></button>
        </form>
    )
}
