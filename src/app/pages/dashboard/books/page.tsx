'use client'
import { api } from '@/services/api'
import { Empty } from '@/components/Empty'
import { PaginatedBookItems } from '@/components/PaginatedBookItems'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Books(): JSX.Element {
    const [books, setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
    // const [search, setSearch] = useState('')

    const handleDelete = async (rowIndex: string): Promise<void> => {
        await api.sheet.books.delete(rowIndex).then(response => {
            if (response.status === 200) {
                setFilteredBooks(prev => prev.filter((_, i) => `${i}` !== rowIndex))
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        // setSearch(value)

        if (value) {
            setFilteredBooks(books.filter(book => book.title.match(value)))
        } else {
            setFilteredBooks(books)
        }
    }

    useEffect(() => {
        api.sheet.books.getIndexed().then(data => {
            setBooks(data)
            setFilteredBooks(data)
        })
    }, [])

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <div className="w-full flex justify-center items-center mb-8">
                <Link
                    href={'/pages/dashboard/book-registration'}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                >
                    Cadastrar livro
                </Link>
            </div>
            {!filteredBooks?.length ? (
                <Empty />
            ) : (
                <div className="px-4">
                    <div className="flex justify-between items-center mb-8">
                        <input
                            type="text"
                            placeholder="Pesquise pelo título do livro"
                            className="border-2 border-gray-300 w-full h-10 p-2"
                            onChange={handleChange}
                        />
                        {/* <button
                                className="py-2 px-4 bg-primary text-white rounded-lg ml-2"
                                onClick={() => {
                                    api.sheet.search(search)
                                        .then(data => {
                                            setBooks([data])
                                        })
                                }}
                            >
                                pesquisar
                            </button> */}
                    </div>
                    <PaginatedBookItems itemsPerPage={10} books={filteredBooks} onDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}
