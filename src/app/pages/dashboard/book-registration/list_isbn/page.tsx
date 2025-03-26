'use client'
import { api, services } from '@/services/api'
import { Empty } from '@/components/Empty'
import { useEffect, useState } from 'react'
import { Img } from '@/components/Img'
import { useToastify } from '@/hooks/useToastify'
import { AiOutlineArrowUp, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BackButton } from '@/components/BackButton'
import BookCreateFormFromList from '@/components/BookCreateFormFromList'
import { useEntities } from '@/hooks/useEntities'
import { v4 as uuidv4 } from 'uuid'

type ErrorObj = { error: boolean; message: string }

interface SearchPageProps {
    searchParams: {
        list_isbn: string
    }
}
export default function SearchPage({ searchParams }: SearchPageProps): JSX.Element {
    const [booksInformations, setBooksInformations] = useState<BrasilapiBook[]>([])
    const [loading, setLoading] = useState(true)
    const [codesWithErrors, setCodesWithErrors] = useState<string[]>([])
    const [sended, setSended] = useState(false)
    const [showBaxToTopButton, setShowBackToTopButton] = useState(false)

    const [apiSelected] = useState({
        google: false,
        brasilapi: true
    })

    const { books } = useEntities(['books'])

    const { toast } = useToastify()

    const getBooksInformations = async (): Promise<void> => {
        const codes = JSON.parse(searchParams.list_isbn)
        const localCodesWithErrors: string[] = []
        const localBooksInformations: BrasilapiBook[] = []

        await Promise.all(codes.map(async (code: string) => searchFromBrasilApi(code)))
            .then(response => {
                if (response?.length === codes?.length) {
                    const hasSomeError = response.some(error => error.error)
                    const hasSomeSuccess = response.some(error => !error.error)

                    if (hasSomeError && !hasSomeSuccess) {
                        toast(response.find(he => he.error)?.message || 'Livros não encontrados', 'error')
                    }

                    if (hasSomeSuccess && !hasSomeError) {
                        toast(response.find(he => !he.error)?.message || 'Livros encontrados com sucesso', 'success')
                    }

                    if (hasSomeSuccess && hasSomeError) {
                        toast('Houve sucesso em alguns, mas teve erro em outros', 'warning')
                    }

                    response.forEach(({ control, data }) => {
                        if (control.error) {
                            localCodesWithErrors.push(control.code)
                        } else {
                            localBooksInformations.push(data)
                        }
                    })
                }
            })
            .finally(() => setLoading(false))

        setBooksInformations(localBooksInformations)
        setCodesWithErrors(localCodesWithErrors)
    }

    useEffect(() => {
        getBooksInformations()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const searchFromBrasilApi = async (code: string): Promise<{ control: ErrorObj; data: BrasilapiBook }> => {
        return await services
            .brasilapi(code)
            .then(bookDetails => {
                const parsed = {
                    ...bookDetails,
                    isbn: code,
                    imageLinks: {
                        thumbnail: bookDetails?.cover_url
                    },
                    categories: bookDetails?.subjects
                } as unknown as BrasilapiBook

                return { control: { error: false, message: 'Livro encontrado' }, data: parsed }
            })
            .catch(error => {
                const message = error?.response?.data?.message
                const responseUrl = error?.response?.config?.url

                console.error('Error trying fetch brasilapi ', message)

                const wrongCode = responseUrl.split('/').pop()

                return {
                    control: { error: true, message: message || 'Erro ao buscar livro', code: wrongCode },
                    data: {} as BrasilapiBook
                }
            })
    }

    const handleRegisterAll = async (): Promise<void> => {
        const localBooksInformations = []

        for (const book of booksInformations) {
            if (books?.length > 0) {
                const bookExists = books?.some(b => +b?.isbn === +book?.isbn)

                if (bookExists) {
                    toast('Livro com o mesmo código ISBN já cadastrado!', 'warning')

                    continue
                }
            }

            localBooksInformations.push(
                api.sheet.books.post({
                    ...(book as unknown as Book),
                    id: uuidv4(),
                    status: 'available',
                    amount: 1
                })
            )
        }

        await Promise.all(localBooksInformations).then(response => {
            if (response?.length === localBooksInformations?.length) {
                toast('Todos os livros foram cadastrados com sucesso!', 'success')
                setBooksInformations([])
                setSended(true)
                window.location.href = '/pages/dashboard/books'
            }
        })
    }

    useEffect(() => {
        document.addEventListener('scroll', () => setShowBackToTopButton(window.scrollY > 100))

        return () => document.removeEventListener('scroll', () => setShowBackToTopButton(window.scrollY > 100))
    }, [])

    if ((!booksInformations?.length && !loading) || sended) {
        return (
            <>
                <BackButton classNameContainer="ml-8" />
                <Empty />
            </>
        )
    }

    if (booksInformations?.length) {
        return (
            <div className="w-full h-full md:p-8 mx-auto">
                <div className="w-full flex flex-col lg:flex lg:flex-row justify-between items-end px-8 md:px-28">
                    <div className="w-full">
                        <BackButton classNameContainer="mb-8" />
                        <h2>Resultado da pesquisa</h2>
                        <span>Verifique se está correto antes de cadastrar</span>
                    </div>
                    <div className="w-full md:w-max flex justify-end items-end lg:mr-8">
                        <button
                            onClick={handleRegisterAll}
                            className="w-full md:w-60 mt-4 bg-blue-500 text-white py-2 px-4 hover:bg-white hover:text-blue-500 border-2 border-blue-500 text-xl"
                        >
                            Cadastrar todos
                        </button>
                    </div>
                    <div className="w-full md:w-max  flex justify-end items-end">
                        {codesWithErrors?.length ? (
                            <button
                                onClick={() => {
                                    const blob = new Blob([codesWithErrors.join('\n')], { type: 'text/plain' })
                                    const url = URL.createObjectURL(blob)
                                    const a = document.createElement('a')
                                    a.href = url
                                    a.download = 'codigos_com_erros.txt'
                                    a.click()
                                    URL.revokeObjectURL(url)
                                }}
                                className="w-full md:w-60 md:min-w-96 mt-4 bg-red-500 text-white py-2 px-4 hover:bg-white hover:text-red-500 border-2 border-red-500 text-xl"
                            >
                                Fazer download dos códigos com erro
                            </button>
                        ) : null}
                    </div>
                </div>
                <div className="w-full h-full p-8 mx-auto flex flex-wrap gap-4">
                    {showBaxToTopButton ? (
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-opacity"
                        >
                            <AiOutlineArrowUp className="text-white text-2xl" />
                        </button>
                    ) : null}
                    {booksInformations?.map((book, index) => {
                        return (
                            <div key={book?.title + index} className="w-full h-full p-8 max-w-[640px] mx-auto border">
                                <div className="flex flex-col">
                                    <div className="p-8">
                                        <Img
                                            src={`${(book as unknown as GoogleApiBooks)?.imageLinks?.thumbnail ?? '/images/empty-book.png'}`}
                                            alt="capa do livro"
                                            width={250}
                                            className="mb-4"
                                        />
                                    </div>
                                    <BookCreateFormFromList
                                        setBooksInformations={setBooksInformations}
                                        isbn={+book?.isbn}
                                        title={book?.title}
                                        subtitle={book?.subtitle}
                                        author={book?.authors?.map(a => a)?.join(', ')}
                                        description={(book as unknown as GoogleApiBooks)?.description}
                                        image={(book as unknown as GoogleApiBooks)?.imageLinks?.thumbnail as string}
                                        amount={1}
                                        category={(book as unknown as GoogleApiBooks)?.categories
                                            ?.map(c => c)
                                            ?.join(', ')}
                                        place=""
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full p-8 max-w-[740px] mx-auto">
            <div className="flex flex-col justify-center items-center">
                <button
                    className={`
                        mt-4 ${apiSelected.brasilapi && loading ? 'border-4 border-green-500' : ''} w-80 bg-primary text-white py-2 px-4 hover:bg-white hover:text-primary border-2 border-primary text-xl flex justify-center items-center}
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
