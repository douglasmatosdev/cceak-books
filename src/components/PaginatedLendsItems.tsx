'use client'

import { useState } from 'react';
import ReactPaginate from 'react-paginate'
import styled from 'styled-components';
import Link from 'next/link';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useToastify } from '@/hooks/useToastify';

export const PaginatedLendsItems = ({
    itemsPerPage,
    lends,
    onDelete
}: {
    itemsPerPage: number
    lends: Lend[]
    onDelete: (index: string) => void
}) => {
    const [itemOffset, setItemOffset] = useState(0);

    const { toast } = useToastify()

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = lends.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(lends.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % lends.length;
        setItemOffset(newOffset);
    };

    return (
        <StyledDiv>
            <div className="flex flex-col">
                {currentItems?.map((lend, index) => {
                    return (
                        <div
                            key={`${lend.first_name} - ${index}`}
                            className="flex items-center w-full h-12 border-b-2 p-4 even:bg-slate-100 hover:bg-slate-200"
                        >
                            <span
                                className="flex-1 text-gray-500 font-semibold"
                            >
                                {lend.first_name} {lend.last_name}
                            </span>
                            <span
                                className="flex-1 text-gray-500 font-semibold"

                            >
                                {lend.book_title}
                            </span>

                            {/* <Link
                                href={`/pages/dashboard/lends/${index}`}
                                className="mr-8 text-primary"
                            >
                                <FaPencilAlt />
                            </Link> */}
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    const answer = prompt('Digite EXCLUIR para confirmar')

                                    if (answer?.toLocaleUpperCase() === 'EXCLUIR') {
                                        onDelete(`${index}`)
                                        toast('Emrpéstiom foi excluído com sucesso!', 'success')
                                    }
                                }}
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