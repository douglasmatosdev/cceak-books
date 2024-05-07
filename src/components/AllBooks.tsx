/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import { BookModal } from './BookModal'
import { Img } from './Img'

interface AllBooksProps {
    books: Book[]
}
export default function AllBooks({ books }: AllBooksProps): JSX.Element {
    const [openModal, setOpenModal] = useState<Book | Record<string, never>>({})

    return (
        <div className="w-full flex flex-wrap gap-4 max-w-[740px] mx-auto">
            {openModal?.title && <BookModal onClose={() => setOpenModal({})} book={openModal} />}

            {books?.map((book, index) => {
                return (
                    <div
                        key={index}
                        className="bg-white w-40 p-2 mx-auto rounded-md flex flex-col justify-center cursor-pointer"
                        onClick={() => {
                            setOpenModal(book)
                        }}
                    >
                        <Img src={book?.image} alt={book.title} width={150} height={250} />
                        <h2 className="font-semibold mt-2 mb-2">{book.title}</h2>
                        <h3>{book.author}</h3>
                    </div>
                )
            })}
        </div>
    )
}
