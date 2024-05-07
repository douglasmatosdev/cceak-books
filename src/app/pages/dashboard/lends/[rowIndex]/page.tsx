'use client'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'

interface LendViewProps {
    params: {
        rowIndex: string
    }
}
export default function LendView(props: LendViewProps): JSX.Element {
    const { params } = props
    const [lend, setLend] = useState<Lend | Record<string, never>>({})
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        api.sheet.lends.getByRowIndex(params.rowIndex).then(data => setLend(data))

        api.sheet.books.getIndexed().then(data => setBooks(data))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = async (rowIndex: string): Promise<void> => {
        await api.sheet.lends.delete(rowIndex).then(response => {
            if (response.status === 200) {
                const book = books.find(b => b.id === lend.book_id)
                const updatedBook = {
                    ...book,
                    status: 'avaiable'
                }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                api.sheet.books.putByColumn('id', bookId, updatedBook)
            }
        })
    }

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <div className="flex flex-col px-4">
                <h1 className="text-2xl">Emprestimo</h1>

                <span className="mt-2 text-xl">
                    <span className="font-semibold">Nome:</span> {lend.first_name}
                </span>
                <span className="mt-2 text-xl">
                    <span className="font-semibold">Sobrenome:</span> {lend.last_name}
                </span>
                <span className="mt-2 text-xl">
                    <span className="font-semibold">Livro:</span> {lend.book_title}
                </span>
                <span className="mt-2 text-xl">
                    <span className="font-semibold">Data do empéstimo:</span>{' '}
                    {new Date(lend.created).toLocaleDateString()}
                </span>

                <button
                    onClick={() => handleDelete(params.rowIndex)}
                    className="py-2 px-4 rounded-md text-white bg-red-500 mt-8 text-xl font-semibold"
                >
                    Excluir
                </button>
            </div>
        </div>
    )
}
