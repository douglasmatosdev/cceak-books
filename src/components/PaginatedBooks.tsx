'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import AllBooks from './AllBooks'
import { Empty } from './Empty'
import { PaginatedContainer } from './styles'

export const PaginatedBooks = ({ itemsPerPage }: { itemsPerPage: number }): JSX.Element => {
    const [itemOffset, setItemOffset] = useState(0)

    const [books, setBooks] = useState<Book[]>([])

    const endOffset = itemOffset + itemsPerPage
    const currentItems = books.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(books.length / itemsPerPage)

    const handlePageClick = (event: { selected: number }): void => {
        const newOffset = (event.selected * itemsPerPage) % books.length
        setItemOffset(newOffset)
    }

    useEffect(() => {
        api.sheet.books.get().then(data => {
            setBooks(data)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PaginatedContainer disabled={currentItems.length <= itemsPerPage}>
            {!books?.length ? <Empty /> : <AllBooks books={currentItems} />}

            <ReactPaginate
                breakLabel="..."
                nextLabel="próximo >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< anterior"
                renderOnZeroPageCount={null}
            />
        </PaginatedContainer>
    )
}
