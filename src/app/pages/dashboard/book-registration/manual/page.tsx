'use client'
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { api } from "@/app/api";

const initialState: Book = {
    isbn: 0,
    title: '',
    subtitle: '',
    author: '',
    description: '',
    category: '',
    image: '',
    amount: 0
}

export default function ManualRegister() {
    const [value, setValue] = useState<Book>(initialState)
    const router = useRouter()

    const handleSubmit = async () => {
        await api.sheet.post(value).then(response => {
            if (response.status === 200) {
                router.push('/pages/dashboard')
            }
        })
    }

    return (
        <div className="p-8 w-full max-w-[740px] mx-auto">
            <h2 className="text-2xl">Cadastro manual</h2>
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
                        className="border-2 border-gray-400 rounded-md p-2 w-full h-10 mb-4"
                    />
                </label>
                <label htmlFor="amount">
                    Quantidade
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Quantidade"
                        // value={value.amount}
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
                    onClick={handleSubmit}
                    className="py-4 px-8 rounded-lg bg-primary text-white font-semibold"
                >
                    Cadastrar
                </button>
            </div>

        </div>
    )
}