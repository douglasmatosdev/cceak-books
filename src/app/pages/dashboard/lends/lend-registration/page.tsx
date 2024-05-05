'use client'
import { useToastify } from "@/hooks/useToastify";
import { api } from "@/services/api"
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa";
import Select from 'react-select';

import { v4 as uuidv4 } from 'uuid'

type Option = {
    label: string
    value: string
}

export default function LendRegistration() {
    const [users, setUsers] = useState<User[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [userSelected, setUserSelected] = useState<User | Record<string, never>>({})
    const [options, setOptions] = useState<Option[]>([])
    const [bookSelected, setBookSelected] = useState<Option | Record<string, never>>({})

    const router = useRouter()
    const { toast } = useToastify()

    const handleSubmit = useCallback(async () => {
        const allLends = await api.sheet.lends.getIndexed()
        const alreadyLend = allLends?.filter(al => al.book_id === bookSelected.value)

        if (alreadyLend.length) {
            toast('Este livro já está emprestado!', 'error')
        } else {
            await api.sheet.lends.post({
                id: uuidv4(),
                user_id: userSelected.id as string,
                first_name: userSelected.first_name,
                last_name: userSelected.last_name,
                book_id: bookSelected.value,
                book_title: bookSelected.label,
                created: new Date().toISOString()
            }).then(response => {
                if (response?.status === 200) {
                    toast('Empréstimo registrado com sucesso!', 'success')
                    const book = books.find(b => b.id === bookSelected.value)
                    const updatedBook = {
                        ...book,
                        status: 'borrowed'
                    }
                    // @ts-ignore
                    api.sheet.books.putByColumn('id', bookSelected.value, updatedBook)
                    router.push('/pages/dashboard/lends')
                    router.refresh()
                }

            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        bookSelected?.label,
        bookSelected?.value,
        userSelected?.first_name,
        userSelected?.id,
        userSelected?.last_name
    ])

    useEffect(() => {
        api.sheet.users.getIndexed()
            .then(data => {
                setUsers(data)
            })

        api.sheet.books.getIndexed()
            .then(data => {
                setBooks(data)
            })

        api.sheet.books.getIndexed()
            .then(data => {
                const opts = data.map(d => ({
                    label: d.title,
                    value: d.id
                })) as Option[]

                setOptions(opts)
            })
    }, [])

    return (
        <div className="w-full max-w-[740px] mx-auto">

            {!userSelected?.id && users.map((user, index) => {
                return (
                    <div
                        key={user.id}
                        className="flex  items-center w-full border-b-2 p-4 even:bg-slate-100 hover:bg-slate-200"
                        onClick={() => {
                            setUserSelected(user)
                        }}
                    >
                        <div className="flex justify-between items-center flex-1 flex-col sm:flex-row">
                            <span>{user.first_name}</span>
                            <span> {user.last_name}</span>
                            <span> {user.phone}</span>
                        </div>
                        <button
                            className="text-primary ml-4"
                        >
                            <FaPencilAlt />
                        </button>
                    </div>
                )
            })}

            {userSelected?.id && (
                <>
                    <div
                        className="flex flex-col p-4"
                    >
                        <span
                            className="mb-4"
                        >
                            Nome: {userSelected.first_name}
                        </span>
                        <span
                            className="mb-4"
                        >
                            Sobrenome: {userSelected.last_name}
                        </span>
                        <span
                            className="mb-4"
                        >
                            Telefone: {userSelected.phone}
                        </span>

                        <div>

                            <Select
                                name="books"
                                options={options}
                                onChange={e => {
                                    setBookSelected(e as Option)
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <button
                            className="py-2 px-4 rounded-md bg-primary text-white"
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            Salvar
                        </button>
                    </div>
                </>
            )}


        </div>
    )
}