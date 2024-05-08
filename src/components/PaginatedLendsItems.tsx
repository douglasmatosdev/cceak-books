'use client'

import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { useToastify } from '@/hooks/useToastify'
import { TextElipsis } from './TextElipsis'
import { VscOpenPreview } from 'react-icons/vsc'
import { PaginatedContainer } from './styles'

export const PaginatedLendsItems = ({
    itemsPerPage,
    lends,
    onDelete
}: {
    itemsPerPage: number
    lends: Lend[]
    onDelete: (index: string) => void
}): JSX.Element => {
    const [itemOffset, setItemOffset] = useState(0)

    const { toast } = useToastify()

    const endOffset = itemOffset + itemsPerPage
    const currentItems = lends.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(lends.length / itemsPerPage)

    const handlePageClick = (event: { selected: number }): void => {
        const newOffset = (event.selected * itemsPerPage) % lends.length
        setItemOffset(newOffset)
    }

    return (
        <PaginatedContainer disabled={currentItems.length <= itemsPerPage}>
            <div className="flex flex-col">
                {currentItems?.map((lend, index) => {
                    return (
                        <div
                            key={`${lend.first_name} - ${index}`}
                            className="flex items-center w-full h-12 border-b-2 p-4 even:bg-slate-100 hover:bg-slate-200"
                        >
                            <span className="flex-1 text-gray-500 font-semibold">
                                <TextElipsis width={'100%'} height={16} text={lend.first_name + ' ' + lend.last_name} />
                            </span>

                            <Link href={`/pages/dashboard/lends/${index}`} className="mr-8 text-primary">
                                <VscOpenPreview className="text-xl" />
                            </Link>
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    const answer = prompt('Digite EXCLUIR para confirmar')

                                    if (answer?.toLocaleUpperCase() === 'EXCLUIR') {
                                        onDelete(`${index}`)
                                        toast('Empréstimo foi excluído com sucesso!', 'success')
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
        </PaginatedContainer>
    )
}
