'use client'
import BookEditForm from '@/components/BookEditForm'
import { useAtomValue } from 'jotai'
import { booksAtom } from '@/atoms/atoms'
import { BackButton } from '@/components/BackButton'

interface EditBookProps {
    params: {
        rowIndex: string
    }
}
export default function EditBook({ params }: EditBookProps): JSX.Element {
    const books = useAtomValue(booksAtom)
    const book = books.find((_, i) => +params.rowIndex === i) as Book

    return (
        <>
            <BackButton classNameContainer="ml-8" />
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
        </>
    )
}
