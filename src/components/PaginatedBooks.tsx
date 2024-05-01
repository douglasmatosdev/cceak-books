'use client'

import { api } from '@/app/api';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'
import styled from 'styled-components';
import AllBooks from './AllBooks';

export const PaginatedBooks = ({ itemsPerPage }: { itemsPerPage: number }) => {
    const [itemOffset, setItemOffset] = useState(0);

    const [books, setBooks] = useState<Book[]>([])

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = books.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(books.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % books.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    useEffect(() => {
        api.sheet.get()
            .then(data => {
                setBooks(data)
            })
    }, [])

    return (
        <StyledDiv>
            <AllBooks books={currentItems} />
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
    ul[role=navigation] {
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
            background-color: #0B8EC2;
            padding: 4px 8px;
            color: #fff;
            width: 100px;
            border-radius: 4px;
        }
    }
`