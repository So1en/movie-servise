import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationButton, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";

export default function CustomPagination({currentPage, handlePageChange}: {currentPage: number; handlePageChange: (currentPage: number) => void}) {
    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {currentPage !== 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} // Handle previous page
                        />
                    </PaginationItem>

                )}
                {(currentPage !== 1  && currentPage !== 2)  && (
                    <>
                        <PaginationItem>
                            <PaginationButton

                                onClick={() => handlePageChange(1)}>
                                1
                            </PaginationButton>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationButton  onClick={() => handlePageChange(currentPage - 1)}>
                            {currentPage - 1}
                        </PaginationButton>
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationButton onClick={() => handlePageChange(currentPage)} isActive={true}>{currentPage}</PaginationButton>
                </PaginationItem>
                <PaginationItem>
                    <PaginationButton  onClick={() => handlePageChange(currentPage + 1)} >{currentPage + 1}</PaginationButton>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext

                        onClick={() => handlePageChange(currentPage + 1)} // Handle next page
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}