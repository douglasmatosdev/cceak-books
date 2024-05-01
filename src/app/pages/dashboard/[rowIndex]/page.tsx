'use client'
import { api } from "@/app/api"
import EditForm from "@/components/EditForm"
import { useEffect, useState } from "react"

interface EditBookProps {
    params: {
        rowIndex: number
    }
}
export default function EditBook({ params }: EditBookProps) {
    const [book, setBook] = useState<Book | Record<string, never>>({})

    useEffect(() => {
        (async () => {
            await api.sheet.getByRowIndex(params.rowIndex)
                .then(data => {

                    setBook(data)
                })
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <EditForm
            rowIndex={params.rowIndex}
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