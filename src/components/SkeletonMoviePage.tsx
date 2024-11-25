import {Skeleton} from "@/components/ui/skeleton.tsx";

export default function SkeletonMoviePage() {
    return (
        <div className="w-full mx-auto p-4 space-y-8">
            <div className="flex flex-col md:flex-row gap-7">
                <Skeleton className="md:w-1/3 w-full h-96"/>
                <div className="w-full md:w-2/3 space-y-4">
                    <Skeleton className="h-8 w-3/4"/>
                    <Skeleton className="h-4 w-1/2"/>
                    <Skeleton className="h-16 w-full"/>
                    <div className="flex space-x-2">
                        <Skeleton className="h-8 w-24"/>
                        <Skeleton className="h-8 w-24"/>
                    </div>
                </div>
            </div>

            <div>
                <Skeleton className="h-6 w-40 mb-4"/>
                <div className="flex space-x-4 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-1/3"/>
                    ))}
                </div>
            </div>

            <div>
                <Skeleton className="h-6 w-40 mb-4"/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full"/>
                    ))}
                </div>
            </div>

            <div>
                <Skeleton className="h-6 w-40 mb-4"/>
                <div className="flex space-x-4 overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-48 w-1/3"/>
                    ))}
                </div>
            </div>
        </div>
    )
}