'use client'
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import UserEditForm from "@/components/UserEditForm"

interface EditUserProps {
    params: {
        rowIndex: string
    }
}
export default function EditUser({ params }: EditUserProps) {
    const [user, setUser] = useState<User | Record<string, never>>({})

    useEffect(() => {
        (async () => {
            await api.sheet.users.getByRowIndex(params.rowIndex)
                .then(data => {

                    setUser(data)
                })
        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <UserEditForm
            rowIndex={params.rowIndex}
            first_name={user.first_name}
            last_name={user.last_name}
            phone={user.phone}
        />
    )
}