import {Card} from "@/components/ui/card.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
    SelectTrigger
} from "@/components/ui/select.tsx";
import {useSearchParams} from "react-router-dom";
import GenreSelector from "@/components/genreSelector.tsx";
import {handleFilters} from "@/utils/queryHandler.ts";
import {updateSearchParams} from "@/utils/updateSearchParams.ts";


export default function Filters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = handleFilters(searchParams, false)



    const handleSortChange = (value: string) => {
        setSearchParams(prev => updateSearchParams({sort_by: value}, prev))
    }


    return (
        <Card className='p-12 flex gap-7 flex-wrap justify-around'>
            <div>
                <h4 className="text-lg font-semibold mb-2">Sort by</h4>
                <Select defaultValue={query.sort_by.split('.')[0] ?? 'vote_average'} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="popularity">Popularity</SelectItem>
                            <SelectItem value="vote_average">Rating</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <GenreSelector valueId={query.with_genres} valueName={query.genre} onSelect={(valueId, valueName) => setSearchParams(prev =>
                updateSearchParams({with_genres: valueId, genre: valueName}, prev)
            )}/>
        </Card>
    )
}