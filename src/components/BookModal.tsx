import { IoMdClose } from 'react-icons/io'
import { Img } from './Img'
import { BookStatus } from './BookStatus';

export const BookModal = (props: { book: Book | Record<string, never>; onClose: () => void }): JSX.Element => {
    const { book, onClose } = props

    return (
        <div className="z-10 fixed w-screen h-screen top-0 bottom-0 left-0 right-0 bg-[#0009] flex justify-center items-center">
            <div className="relative bg-white w-[90%] max-w-[500px] h-[90%] flex flex-col overflow-y-auto">
                <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
                    <IoMdClose />
                </button>

                <div className="flex justify-center items-center px-8 py-10">
                    <Img src={book.image} alt={book.title} width={250} height={350} />
                </div>

                <div className="px-8">
                    <h1 className="text-xl text-gray-500">{book.title}</h1>
                    <span className="mb-4">
                        Por <span className="text-emerald-900">{book.author}</span>
                    </span>
                    <h2>{book.subtitle}</h2>
                    <span>Categoria: {book.category}</span>
                    <h4 className="mt-2">
                        <BookStatus label={book?.status} />
                    </h4>
                </div>
            </div>
        </div>
    )
}
