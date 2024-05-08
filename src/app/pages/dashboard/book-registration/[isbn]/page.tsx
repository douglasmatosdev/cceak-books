'use client'
import { services } from '@/services/api'
import { Empty } from '@/components/Empty'
import { useEffect, useState } from 'react'
import BookCreateForm from '@/components/BookCreateForm'
import { Img } from '@/components/Img'
import { useToastify } from '@/hooks/useToastify'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useRouter } from 'next/navigation'

interface SearchPageProps {
    params: {
        isbn: string
    }
}
export default function SearchPage({ params }: SearchPageProps): JSX.Element {
    const [bookInfo, setBookInfo] = useState<GoogleApiBooks | Record<string, never>>({})
    const [loading, setLoading] = useState(true)

    const [apiSelected, setApiSelected] = useState({
        google: false,
        brasilapi: false
    })

    const router = useRouter()

    const { toast } = useToastify()

    const search = async (code: string): Promise<void> => {
        await services
            .google(code)
            .then(async bookDetails => {
                if (bookDetails?.title) {
                    setBookInfo(bookDetails)
                    toast('Livro encontrado!', 'success')
                }
            })
            .catch(async error => {
                console.error('Error trying search book', error)
                toast('Erro ao tentar pesquisar livro', 'error')
                setApiSelected({
                    google: false,
                    brasilapi: true
                })

                await setTimeout(async () => {
                    await services
                        .brasilapi(code)
                        .then(bookDetails => {
                            const parsed = {
                                ...bookDetails,
                                imageLinks: {
                                    thumbnail: bookDetails?.cover_url
                                },
                                categories: bookDetails?.subjects
                            } as unknown as GoogleApiBooks
                            setBookInfo(parsed)
                            setLoading(false)
                            toast('Livro encontrado!', 'success')
                        })
                        .catch(error => {
                            setApiSelected({
                                brasilapi: false,
                                google: false
                            })
                            setLoading(false)
                            router.push('/pages/dashboard/book-registration/typing')
                            console.error('Error trying fetch brasilapi ', error)
                            toast('Erro ao tentar pesquisar livro', 'error')
                        })
                }, 3000)
            })
    }

    useEffect(() => {
        search(params.isbn)
        setApiSelected({
            ...apiSelected,
            google: true
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!bookInfo) {
        return <Empty />
    }

    if (bookInfo?.title) {
        return (
            <div className="w-full h-full p-8 max-w-[740px] mx-auto">
                <h2>Resultado da pesquisa</h2>
                <span>Verifique se está correto antes de cadastrar</span>
                <div className="flex flex-col">
                    <div className="p-8">
                        <Img
                            src={`${bookInfo?.imageLinks?.thumbnail ?? '/images/empty-book.png'}`}
                            alt="capa do livro"
                            width={250}
                            className="mb-4"
                        />
                    </div>
                    <BookCreateForm
                        isbn={+params?.isbn}
                        title={bookInfo?.title}
                        subtitle={bookInfo?.subtitle}
                        author={bookInfo?.authors?.map(a => a)?.join(', ')}
                        description={bookInfo?.description}
                        image={bookInfo?.imageLinks?.thumbnail}
                        amount={1}
                        category={bookInfo?.categories?.map(c => c)?.join(', ')}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full p-8 max-w-[740px] mx-auto">
            <div className="flex flex-col justify-center items-center">
                <button
                    className={`
                        ${apiSelected.google && loading ? 'border-4 border-green-500' : ''} w-80 bg-primary text-white py-2 px-4 hover:bg-white hover:text-primary border-2 border-primary text-xl flex justify-center items-center opacity-${apiSelected.google ? '100' : '50'}
                    `}
                >
                    Google API
                    {apiSelected.google && (
                        <div className="ml-4">
                            <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                        </div>
                    )}
                </button>

                <button
                    disabled={!apiSelected.brasilapi}
                    className={`
                        mt-4 ${apiSelected.brasilapi && loading ? 'border-4 border-green-500' : ''} w-80 bg-primary text-white py-2 px-4 hover:bg-white hover:text-primary border-2 border-primary text-xl flex justify-center items-center opacity-${apiSelected.brasilapi ? '100' : '50'}
                    `}
                >
                    Brasil API
                    {apiSelected.brasilapi && (
                        <div className="ml-4">
                            <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                        </div>
                    )}
                </button>
            </div>
        </div>
    )
}
