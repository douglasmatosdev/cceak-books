'use client'
import BookEditForm from '@/components/BookEditForm'
import { BackButton } from '@/components/BackButton'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'

interface EditBookProps {
    params: {
        rowIndex: string
    }
}
export default function EditBook({ params }: EditBookProps): JSX.Element {
    const [books, setBooks] = useState<Book[]>([])
    const book = books.find((_, i) => +params.rowIndex === i) as Book

    useEffect(() => {
        api.sheet.books.getIndexed().then(data => {
            setBooks(data)
        })
    }, [])

    return (
        <>
            <BackButton classNameContainer="ml-8" />
            <BookEditForm
                rowIndex={`${params.rowIndex}`}
                isbn={book?.isbn}
                title={book?.title}
                subtitle={book?.subtitle}
                author={book?.author}
                description={book?.description}
                image={book?.image}
                amount={book?.amount}
                category={book?.category}
                place={book?.place}
            />
        </>
    )
}
