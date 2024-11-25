import {useSearchParams} from "react-router-dom";
import {useRef, useState} from "react";
import {updateSearchParams} from "@/utils/updateSearchParams.ts";

export default function useTabPagination() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [listType, setListType] = useState(searchParams.get("filter") ?? 'popular');
    const [currentPage, setCurrentPage] = useState(1);
    const [mediaType, setMediaType] = useState(searchParams.get("media") ?? 'movie');

    const ref = useRef<HTMLDivElement | null>(null);


    const handleChange = (value: string) => {
        setSearchParams({filter: value}, {replace: true})
        setListType(value)
        setCurrentPage(1)
    }

    const handleSearchChange = (value: string) => {
        setSearchParams(prev => updateSearchParams({'mediaType': value}, prev))
        setMediaType(value)
        setCurrentPage(1)
    }

    const handlePageChange = (page: number) => {
        if (ref) ref.current?.scrollIntoView({behavior: "smooth"})
        setCurrentPage(page);
    }

    return {
        listType,
        mediaType,
        currentPage,
        handlePageChange,
        handleSearchChange,
        handleChange,
        ref
    }
}