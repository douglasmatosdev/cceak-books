'use client'

import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Link from 'next/link'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useToastify } from '@/hooks/useToastify'
import { PaginatedContainer } from './styles'

export const PaginatedUserItems = ({
    itemsPerPage,
    users,
    onDelete
}: {
    itemsPerPage: number
    users: User[]
    onDelete: (index: string) => void
}): JSX.Element => {
    const [itemOffset, setItemOffset] = useState(0)

    const { toast } = useToastify()

    const endOffset = itemOffset + itemsPerPage
    const currentItems = users.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(users.length / itemsPerPage)

    const handlePageClick = (event: { selected: number }): void => {
        const newOffset = (event.selected * itemsPerPage) % users.length
        setItemOffset(newOffset)
    }

    return (
        <PaginatedContainer disabled={currentItems.length <= itemsPerPage}>
            <div className="flex flex-col">
                {currentItems?.map((user, index) => {
                    return (
                        <div
                            key={`${user.phone} - ${index}`}
                            className="flex items-center w-full h-12 border-b-2 p-4 even:bg-slate-100 hover:bg-slate-200"
                        >
                            <h2 className="flex-1 text-gray-500 font-semibold">
                                {user.first_name} {user.last_name}
                            </h2>

                            <Link href={`/pages/dashboard/users/${index}`} className="mr-8 text-primary">
                                <FaPencilAlt />
                            </Link>
                            <button
                                className="text-red-500"
                                onClick={() => {
                                    const answer = prompt('Digite EXCLUIR para confirmar')

                                    if (answer?.toLocaleUpperCase() === 'EXCLUIR') {
                                        onDelete(`${index}`)
                                        toast('Usuário foi excluído com sucesso!', 'success')
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
