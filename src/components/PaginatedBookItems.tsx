'use client'

import { useState } from 'react';
import ReactPaginate from 'react-paginate'
import styled from 'styled-components';
import Link from 'next/link';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

export const PaginatedBookItems = ({
    itemsPerPage,
    books,
    onDelete
}: {
    itemsPerPage: number
    books: Book[]
    onDelete: (index: number) => void
}) => {
    const [itemOffset, setItemOffset] = useState(0);

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

    return (
        <StyledDiv>
            <div className="flex flex-col">
                {currentItems?.map((book, index) => {
                    return (
                        <div
                            key={`${book.title} - ${index}`}
                            className="flex items-center w-full h-10 border-b-2 mb-2"
                        >
                            <h2
                                className="flex-1 text-gray-500 font-semibold"
                            >
                                {book.title}
                            </h2>

                            <Link
                                href={`/pages/dashboard/${index}`}
                                className="mr-8 text-primary"
                            >
                                <FaPencilAlt />
                            </Link>
                            <button
                                className="text-red-500"
                                onClick={() => onDelete(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    )
                })}
            </div>
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