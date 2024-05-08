'use client'
import { BackButton } from '@/components/BackButton'
import { Empty } from '@/components/Empty'
import { PaginatedUserItems } from '@/components/PaginatedUserItems'
import { api } from '@/services/api'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'

export default function Users(): JSX.Element {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

    const handleDelete = async (rowIndex: string): Promise<void> => {
        await api.sheet.users.delete(rowIndex).then(response => {
            if (response.status === 200) {
                const filtered = users.filter((_, i) => `${i}` !== rowIndex)
                setUsers(filtered)
                setFilteredUsers(filtered)
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value

        if (value) {
            setFilteredUsers(users.filter(user => user.first_name.match(value)))
        } else {
            setFilteredUsers(users)
        }
    }

    useEffect(() => {
        api.sheet.users.getIndexed().then(data => {
            setUsers(data)
            setFilteredUsers(data)
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <BackButton classNameContainer="ml-4 mb-8" />
            <div className="w-full flex justify-center items-center mb-8">
                <Link
                    href={'/pages/dashboard/users/user-registration'}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                >
                    Cadastrar usuário
                </Link>
            </div>
            {!filteredUsers?.length ? (
                <Empty />
            ) : (
                <div className="px-4">
                    <div className="flex justify-between items-center mb-8">
                        <input
                            type="text"
                            placeholder="Pesquise pelo primeiro nome do usuário"
                            className="border-2 border-gray-300 w-full h-10 p-2"
                            onChange={handleChange}
                        />
                        {/* <button
                                className="py-2 px-4 bg-primary text-white rounded-lg ml-2"
                                onClick={() => {
                                    api.sheet.search(search)
                                        .then(data => {
                                            setBooks([data])
                                        })
                                }}
                            >
                                pesquisar
                            </button> */}
                    </div>
                    <PaginatedUserItems itemsPerPage={10} users={filteredUsers} onDelete={handleDelete} />
                </div>
            )}
        </div>
    )
}
