import {DataTable} from "@/components/payments/DataTable.tsx";
import {columns} from "@/components/payments/columns.tsx";
import {useRattedList} from "@/hooks/useRattedList.tsx";
import {useNavigate} from "react-router-dom";
import {IRattedMovie} from "@/api/ratingService.tsx";
import {Row} from "@tanstack/react-table";

export default function Ratings() {
    const {rattedList} = useRattedList();

    const navigate = useNavigate()

    const onRowClick = (row: Row<IRattedMovie>) => {
        console.log(row)
        navigate(`/${row.original.media_type}/${row.original.id}`)
    }

    return (
        <DataTable columns={columns} data={rattedList ?? []} onRowClick={onRowClick}/>
    )
}