import {Button} from "@/components/ui/button"
import {useQuery} from "@tanstack/react-query";
import {fetchingGenres} from "@/api/tmdbService.ts";

type Props = {
    valueId: string | undefined,
    onSelect: (valueId: string, valueName: string) => void,
    valueName: string | undefined,
}

export default function GenreSelector({valueId, valueName, onSelect}: Props) {
    const {data: genreList} = useQuery({
        queryKey: ['genreList'],
        queryFn: () => fetchingGenres('movie'),
    })

    const handleMultiValue = (includes: string, value: string) => {
        return value?.split('|').includes(includes)
            ? value?.split('|').filter(g => g !== includes).join('|')
            : [...(value?.split('|') ?? []), includes].join('|')
    }

    const toggleGenre = (genreId: string, name: string) => {
        onSelect(handleMultiValue(genreId, valueId ?? ''), handleMultiValue(name, valueName ?? ''))
    }

    return (
        <div className="w-full max-w-md">
            <h4 className="text-lg font-semibold mb-2">Genres</h4>
            <div className="flex flex-wrap gap-2">
                {genreList?.genres.map((genre) => (
                    <Button
                        key={genre.id}
                        variant={valueId?.split('|').includes(String(genre.id)) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleGenre(String(genre.id), genre.name)}
                        className="rounded-full"
                    >
                        {genre.name}
                    </Button>
                ))}
            </div>
        </div>
    )
}