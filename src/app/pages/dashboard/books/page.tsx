'use client'
import { api } from '@/services/api'
import { Empty } from '@/components/Empty'
import { PaginatedBookItems } from '@/components/PaginatedBookItems'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { BackButton } from '@/components/BackButton'
import { Loading } from '@/components/Loading'

export default function Books(): JSX.Element {
    const [books, setBooks] = useState<Book[]>([])
    const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
    const [loading, setLoading] = useState(true)

    const handleDelete = async (rowIndex: string): Promise<void> => {
        await api.sheet.books.delete(rowIndex).then(() => {
            const filtered = books.filter((_, i) => `${i}` !== rowIndex)
            setBooks(filtered)
            setFilteredBooks(filtered)
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        if (value) {
            setFilteredBooks(books.filter(book => book.title.toLowerCase().match(value.toLowerCase())))
        } else {
            setFilteredBooks(books)
        }
    }

    useEffect(() => {
        api.sheet.books
            .getIndexed()
            .then(data => {
                setBooks(data)
                setFilteredBooks(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <BackButton classNameContainer="ml-4 mb-8" />
            <div className="w-full flex justify-center items-center mb-8">
                <Link
                    href={'/pages/dashboard/book-registration'}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                >
                    Cadastrar livro
                </Link>
            </div>
            {loading ? (
                <Loading />
            ) : !filteredBooks?.length ? (
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
                    </div>
                    <PaginatedBookItems itemsPerPage={10} books={filteredBooks} onDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}
