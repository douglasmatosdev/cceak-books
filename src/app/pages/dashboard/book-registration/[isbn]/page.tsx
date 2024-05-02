'use client'
import { fetchBookDetails } from "@/app/api";
import { Empty } from "@/components/Empty";
import { GoogleApiBooks } from "@/types/google-api-book";
import { useEffect, useState } from "react";
import CreateForm from "@/components/CreateForm";
import { Img } from "@/components/Img";
import { useToastify } from "@/hooks/useToastify";

interface SearchPageProps {
    params: {
        isbn: string
    }
}
export default function SearchPage({ params }: SearchPageProps) {
    const [bookInfo, setBookInfo] = useState<GoogleApiBooks | Record<string, never>>({})

    const { toast } = useToastify()

    const search = async (code: string) => {
        await fetchBookDetails(code)
            .then(bookDetails => {
                if (bookDetails?.title) {
                    setBookInfo(bookDetails)
                    toast('Livro encontrado!', 'success')
                } else {
                    toast('Livro não encontrado!', 'warning')
                }
            })
            .catch(error => {
                console.error('Error trying search book', error)
                toast('Erro ao tentar pesquisar livro', 'error')
            })
    }

    useEffect(() => {
        search(params.isbn)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!bookInfo) {
        return <Empty />
    }

    // if (!params.isbn || !bookInfo?.title) {
    //     return (
    //         <div className="w-full h-full p-8 max-w-[740px] max-auto">
    //             <Empty />
    //         </div>
    //     )
    // }

    return bookInfo && (
        <div className="w-full h-full p-8 max-w-[740px] mx-auto">
            <h2>Resultado da pesquisa</h2>
            <span>Verifique se está correto antes de cadastrar</span>
            <div className="flex flex-col">
                <div className="p-8">
                    <Img
                        src={`${bookInfo?.imageLinks?.thumbnail}`}
                        alt="capa do livro"
                        width={250}
                        className="mb-4"
                    />
                </div>
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