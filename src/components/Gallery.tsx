import LightGallery from 'lightgallery/react';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import {useCallback, useRef} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {MovieDetails} from "@/types/Movie.ts";
import {InitDetail} from "lightgallery/lg-events";

export default function Gallery({movieDetails}: {movieDetails?: MovieDetails}) {


    const formattedGalleryItems = movieDetails?.images.backdrops.map((backdrop) => ({
        src: `https://image.tmdb.org/t/p/original${backdrop.file_path}`, // Original image URL for LightGallery
        thumb: `https://image.tmdb.org/t/p/w200${backdrop.file_path}`,   // Thumbnail for preview
        alt: `Backdrop image for ${movieDetails.title}`,                  // Alt text
        subHtml: `<h4>${movieDetails.title}</h4><p>${backdrop.vote_average} Rating</p>`, // Optional HTML caption
    }));

    const lightGallery = useRef<any>(null);
    const onInit = useCallback((detail: InitDetail) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);
    return (
        <LightGallery elementClassNames={'grid grid-cols-4'} onInit={onInit} dynamicEl={formattedGalleryItems} dynamic={true} addClass={'display: grid'} speed={500} plugins={[lgThumbnail, lgZoom]}>
            {movieDetails?.images.backdrops.slice(0, 7).map((backdrop, index) => (
                <div onClick={() => lightGallery.current.openGallery(index)} key={index}>
                    <Card key={index}
                          className={`relative overflow-hidden rounded-lg`}>
                        <CardContent className="p-0">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </CardContent>
                    </Card>
                </div>
            ))}
            <a onClick={() => lightGallery.current.openGallery(8)}
               className="relative  rounded-lg overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieDetails?.images.backdrops[8]?.file_path}`}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">
                                            +{(movieDetails?.images?.backdrops?.length ?? 0) - 8}
                                        </span>
                </div>
            </a>
        </LightGallery>
    )
}