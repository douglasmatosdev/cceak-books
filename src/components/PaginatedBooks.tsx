'use client'

import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components'
import AllBooks from './AllBooks'
import { Empty } from './Empty'
import { useAtom } from 'jotai'
import { booksAtom } from '@/atoms/atoms'

export const PaginatedBooks = ({ itemsPerPage }: { itemsPerPage: number }): JSX.Element => {
    const [itemOffset, setItemOffset] = useState(0)

    const [books, setBooks] = useAtom(booksAtom)

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
        <StyledDiv>
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
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    ul[role='navigation'] {
        display: flex;
        max-width: 600px;
        margin: 2rem auto;

        li {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        li.next,
        li.previous {
            background-color: #0b8ec2;
            padding: 4px 8px;
            color: #fff;
            width: 100px;
            border-radius: 4px;
        }
    }
`
