import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {MenuIcon} from "lucide-react";
import SearchInput from "@/components/Header/SearchInput.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {Genre} from "@/types/Movie.ts";
import {Link} from "react-router-dom";
import {useState} from "react";

type Props = {
    movieGenres: Genre[] | undefined,
    tvGenres: Genre[] | undefined,

}

export default function Sidebar({movieGenres, tvGenres}: Props) {

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger>
                    <MenuIcon/>
                </SheetTrigger>
                <SheetContent side='left'>
                    <div className='pt-4'>
                        <SearchInput className='w-full' onSubmitSuccess={() => setIsSheetOpen(false)}/>
                        <Accordion type="single" collapsible>
                            <AccordionItem value='movies'>
                                <AccordionTrigger>Movies</AccordionTrigger>
                                <AccordionContent>
                                    <div className='grid grid-cols-2 gap-6'>
                                        {movieGenres?.map(genre => (
                                            <Link to={`/movie?genre=${genre.name}&with_genres=${genre.id}`}
                                                onClick={() => setIsSheetOpen(false)}
                                                key={genre.id}
                                                className="text-sm">
                                                {genre.name}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value='tvshows'>
                                <AccordionTrigger>TV Shows</AccordionTrigger>
                                <AccordionContent>
                                    <div className='grid grid-cols-2 gap-6'>
                                        {tvGenres?.map(genre => (
                                            <Link to={`/tv?genre=${genre.name}&with_genres=${genre.id}`}
                                                onClick={() => setIsSheetOpen(false)}
                                                key={genre.id}
                                                className="text-sm">
                                                {genre.name}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}