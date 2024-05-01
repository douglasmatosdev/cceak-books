'use client'
import { api } from "@/app/api";
import { Emtpy } from "@/components/Emtpy";
import { PaginatedBookItems } from "@/components/PaginatedBookItems";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [books, setBooks] = useState<Book[]>([])
    const [search, setSearch] = useState('')

    const handleDelete = async (rowIndex: number) => {
        await api.sheet.delete(rowIndex)
            .then(response => {
                if (response.status === 200) {
                    setBooks(prev => prev.filter((_, i) => i !== rowIndex))
                }
            })
    }

    useEffect(() => {
        api.sheet.getIndexed()
            .then(data => setBooks(data))
    }, [])

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <div className="w-full flex justify-center items-center mb-8">
                <Link
                    href={"/pages/dashboard/book-registration"}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                >
                    Cadastrar livro
                </Link>
            </div>
            {!books?.length ? <Emtpy /> :
                (
                    <div className="px-4">
                        <div className="flex justify-between items-center mb-8">
                            <input
                                type="text"
                                placeholder="Pesquise pelo título do livro"
                                className="border-2 border-gray-300 w-full h-10"
                                onChange={e => setSearch(e.target.value)}
                            />
                            <button
                                className="py-2 px-4 bg-primary text-white rounded-lg ml-2"
                                onClick={() => {
                                    api.sheet.search(search)
                                        .then(data => {
                                            setBooks([data])
                                        })
                                }}
                            >
                                pesquisar
                            </button>
                        </div>
                        <PaginatedBookItems
                            itemsPerPage={10} 
                            books={books}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
        </div>
    )
}