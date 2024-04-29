import { books } from "@/utils/mock-data"
import Image from "next/image"

export default function AllBooks() {

    return (
        <div className="w-full flex flex-wrap gap-8">

            {books.map((book, index) => {
                return (

                    <div
                        key={index}
                        className="bg-white p-8 w-[90%] mx-auto sm:w-[350px] rounded-md flex flex-col justify-center items-center"
                    >
                        <img src={book.imageLinks.thumbnail} width={250} height={350} alt={book.title} />
                        <h2>{book.title}</h2>
                        <small>{book.subtitle}</small>
                    </div>
                )
            })}
        </div>
    )
}