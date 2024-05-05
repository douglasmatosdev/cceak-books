'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { api } from "@/services/api";
import { useToastify } from "@/hooks/useToastify";
import { SelectPhoto } from "./SelectPhoto";
import { ImCamera } from "react-icons/im";

import { v4 as uuidv4 } from 'uuid'

type BookCreateFormProps = {

} & Book

export default function BookCreateForm(props: BookCreateFormProps) {
    const { isbn, title, subtitle, author, description, image, amount, category } = props

    const [value, setValue] = useState({ isbn, title, subtitle, author, description, image, amount, category })
    const [getPhoto, setGetPhoto] = useState<boolean>(false)

    const router = useRouter()

    const { toast } = useToastify()

    const handleSubmit = async (book: Book) => {
        await api.sheet.books.post({
            ...book,
            id: uuidv4(),
            status: 'avaiable'
        })
            .then(response => {
                if (response.status === 200) {
                    router.push('/pages/dashboard')
                    toast('Livro cadastrado com sucesso!', 'success')
                }
            })
    }

    const handleSave = (image: string) => {
        setValue({
            ...value,
            image
        })
        setGetPhoto(false)
        toast('Imagem selecionada com sucesso!', 'info')
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl">Formulário de Edição</h2>
            {getPhoto && <SelectPhoto onCancel={() => setGetPhoto(false)} onSave={handleSave} />}
            <form className="mt-4">
                <label htmlFor="isbn">
                    ISBN
                    <input
                        type="text"
                        name="isbn"
                        id="isbn"
                        placeholder="ISBN"
                        value={value.isbn}
                        onChange={e => setValue({
                            ...value,
                            isbn: +e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="title">
                    Título
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Título"
                        value={value.title}
                        onChange={e => setValue({
                            ...value,
                            title: e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="subtitle">
                    Subtítulo
                    <input
                        type="text"
                        name="subtitle"
                        id="subtitle"
                        placeholder="Subtítulo"
                        value={value.subtitle}
                        onChange={e => setValue({
                            ...value,
                            subtitle: e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="author">
                    Autor
                    <input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="Autor"
                        value={value.author}
                        onChange={e => setValue({
                            ...value,
                            author: e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="description">
                    Descrição
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Descrição"
                        value={value.description}
                        onChange={e => setValue({
                            ...value,
                            description: e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="category">
                    Categoria
                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Categoria"
                        value={value.category}
                        onChange={e => setValue({
                            ...value,
                            category: e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="image">
                    Imagem
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Url da Imagem"
                            value={value.image}
                            onChange={e => setValue({
                                ...value,
                                image: e.target.value
                            })}
                            className="border-2 border-gray-400 rounded-md p-2 w-full h-10"
                        />
                        <button
                            className="h-10 py-2 px-4 rounded-lg bg-primary ml-2 cursor-pointer text-white"
                            onClick={(e) => {
                                e.preventDefault()
                                setGetPhoto(true)
                            }}
                        >
                            <ImCamera />
                        </button>
                    </div>
                </label>
                <label htmlFor="amount">
                    Quantidade
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Quantidade"
                        value={value.amount}
                        onChange={e => setValue({
                            ...value,
                            amount: +e.target.value
                        })}
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
            </form>

            <div className="flex w-full justify-between items-center">
                <Link
                    href={"/pages/dashboard/book-registration"}
                    className="py-4 px-8 rounded-lg bg-primary text-white font-semibold"
                >
                    Cancelar
                </Link>

                <button
                    className="py-4 px-8 rounded-lg bg-primary text-white font-semibold"
                    onClick={() => handleSubmit(value)}
                >
                    Cadastrar
                </button>
            </div>

        </div>
    )
}