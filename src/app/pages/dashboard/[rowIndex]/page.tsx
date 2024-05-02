'use client'
import { api } from "@/services/api"
import BookEditForm from "@/components/BookEditForm"
import { useEffect, useState } from "react"

interface EditBookProps {
    params: {
        rowIndex: string
    }
}
export default function EditBook({ params }: EditBookProps) {
    const [book, setBook] = useState<Book | Record<string, never>>({})

    useEffect(() => {
        (async () => {
            await api.sheet.books.getByRowIndex(params.rowIndex)
                .then(data => {

                    setBook(data)
                })
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BookEditForm
            rowIndex={`${params.rowIndex}`}
            isbn={book.isbn}
            title={book.title}
            subtitle={book.subtitle}
            author={book.author}
            description={book.description}
            image={book.image}
            amount={book.amount}
            category={book.category}
        />
    )
}