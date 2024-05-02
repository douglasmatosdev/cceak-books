'use client'
import { Empty } from "@/components/Empty";
import { PaginatedLendsItems } from "@/components/PaginatedLendsItems";
import { api } from "@/services/api";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function Users() {
    const [lends, setLends] = useState<Lend[]>([])
    const [filteredLends, setFilteredLends] = useState<Lend[]>(lends)


    const handleDelete = async (rowIndex: string) => {
        await api.sheet.users.delete(rowIndex)
            .then(response => {
                if (response.status === 200) {
                    setFilteredLends(prev => prev.filter((_, i) => `${i}` !== rowIndex))
                }
            })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // setSearch(value)

        if (value) {
            setFilteredLends(lends.filter(user => user.first_name.match(value)))
        } else {
            setFilteredLends(lends)
        }
    }
    

    useEffect(() => {
        api.sheet.lends.getIndexed()
            .then(data => {
                setLends(data)
                setFilteredLends(data)
            })
    }, [])

    return (
        <div className="w-full max-w-[740px] mx-auto">
            <div className="w-full flex justify-center items-center mb-8">
                <Link
                    href={"/pages/dashboard/lends/lends-registration"}
                    className="py-2 px-4 bg-primary text-white rounded-lg"
                >
                    Registrar um empréstimo
                </Link>
            </div>
            {!filteredLends?.length ? <Empty /> :
                (
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
                        <PaginatedLendsItems
                            itemsPerPage={10}
                            lends={filteredLends}
                            onDelete={handleDelete}
                        />
                    </div>
                )}
        </div>
    )
}