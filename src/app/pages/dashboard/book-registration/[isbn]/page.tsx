'use client'
import { fetchBookDetails } from "@/app/api";
import { Empty } from "@/components/Empty";
import { GoogleApiBooks } from "@/types/google-api-book";
import { useEffect, useState } from "react";
import CreateForm from "@/components/CreateForm";
import { Img } from "@/components/Img";

interface SearchPageProps {
    params: {
        isbn: string
    }
}
export default function SearchPage({ params }: SearchPageProps) {
    const [bookInfo, setBookInfo] = useState<GoogleApiBooks | Record<string, never>>({})

    const search = async (code: string) => {
        const bookDetails = await fetchBookDetails(code);
        setBookInfo(bookDetails);
    }

    useEffect(() => {
        search(params.isbn)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!bookInfo) {
        return <Empty />
    }

    if (!params.isbn || !bookInfo?.title) {
        return (
            <div className="w-full h-full p-8 max-w-[740px] max-auto">
                <Empty />
            </div>
        )
    }

    return bookInfo && (
        <div className="w-full h-full p-8 max-w-[740px] max-auto">
            <h2>Resultado da pesquisa</h2>
            <span>Verifique se está correto antes de cadastrar</span>
            <div className="flex flex-col">
                <Img
                    src={`${bookInfo?.imageLinks?.thumbnail}`}
                    alt="capa do livro"
                    width={250}
                    className="mb-4"
                />
                <CreateForm
                    isbn={+params.isbn}
                    title={bookInfo.title}
                    subtitle={bookInfo.subtitle}
                    author={bookInfo.authors?.map(a => a)?.join(', ')}
                    description={bookInfo.description}
                    image={bookInfo?.imageLinks?.thumbnail}
                    amount={1}
                    category={bookInfo.categories?.map(c => c)?.join(', ')}
                />
            </div>
        </div>
    )
} 