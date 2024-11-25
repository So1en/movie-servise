import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import {IRattedMovie} from "@/api/ratingService.tsx";



export const columns: ColumnDef<IRattedMovie>[] = [
    {
        accessorKey: 'date',
        header: 'Date'
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'feedback',
        header: 'Feedback',
    },
    {
        accessorKey: 'rate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rate
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="ml-8">{row.getValue("rate")}</div>,
    },
]