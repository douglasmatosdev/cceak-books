'use client'

import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import AllBooks from './AllBooks'
import { Empty } from './Empty'
import { PaginatedContainer } from './styles'
import { Loading } from './Loading'
import { useEntities } from '@/hooks/useEntities'

export const PaginatedBooks = ({ itemsPerPage }: { itemsPerPage: number }): JSX.Element => {
    const [itemOffset, setItemOffset] = useState(0)

    const { lends, books, loadingBooks } = useEntities(['lends', 'books'])

    const endOffset = itemOffset + itemsPerPage
    const currentItems = books.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(books.length / itemsPerPage)

    const handlePageClick = (event: { selected: number }): void => {
        const newOffset = (event.selected * itemsPerPage) % books.length
        setItemOffset(newOffset)
    }

    return (
        <PaginatedContainer disabled={currentItems.length <= itemsPerPage}>
            {loadingBooks ? <Loading /> : !books?.length ? <Empty /> : <AllBooks lends={lends} books={currentItems} />}

            <div className="mx-auto w-full flex justify-center items-center -mb-12 mt-8">
                {books?.length ? <span>{books?.length} livros encontrados</span> : null}
            </div>

            <ReactPaginate
                activeLinkClassName="bg-primary text-white rounded-full px-4 py-2"
                breakLabel="..."
                nextLabel={<div className="min-w-20">{'próximo >'}</div>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<div className="min-w-20">{'< anterior'}</div>}
                renderOnZeroPageCount={null}
            />
        </PaginatedContainer>
    )
}
