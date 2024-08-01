/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { BookModal } from './BookModal'
import { Img } from './Img'
import { BookStatus } from './BookStatus'
import { TextElipsis } from './TextElipsis'

interface AllBooksProps {
    books: Book[]

    // apens um comentário
}
export default function AllBooks({ books }: AllBooksProps): JSX.Element {
    const [openModal, setOpenModal] = useState<Book | Record<string, never>>({})

    return (
        <div className="w-full flex flex-wrap gap-2  justify-center p-2 max-w-[740px] mx-auto">
            {openModal?.title && <BookModal onClose={() => setOpenModal({})} book={openModal} />}

            {books?.map((book, index) => {
                return (
                    <div
                        key={index}
                        className="bg-white w-36 p-2 rounded-md flex flex-col items-start justify-start cursor-pointer"
                        onClick={() => {
                            setOpenModal(book)
                        }}
                    >
                        <Img src={book?.image} alt={book.title} width={136} height={196} className="h-48" />
                        <h2 className="font-semibold mt-2 mb-2 text-sm">
                            <TextElipsis text={book.title} width={144} height={32} />
                        </h2>
                        <h3 className="text-sm">
                            <TextElipsis text={book.author} width={144} height={16} />
                        </h3>
                        <h4 className="mt-6 text-sm w-full inline-block">
                            <BookStatus label={book?.status} className="w-full inline-block text-center" />
                        </h4>
                    </div>
                )
            })}
        </div>
    )
}
