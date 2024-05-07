'use client'
import UserEditForm from '@/components/UserEditForm'
import { useAtomValue } from 'jotai'
import { usersAtom } from '@/atoms/atoms'
import { BackButton } from '@/components/BackButton'

interface EditUserProps {
    params: {
        rowIndex: string
    }
}
export default function EditUser({ params }: EditUserProps): JSX.Element {
    const users = useAtomValue(usersAtom)
    const user = users.find((_, i) => +params.rowIndex === i) as User

    return (
        <>
            <BackButton classNameContainer="ml-8 mb-8" />
            <UserEditForm
                rowIndex={params?.rowIndex}
                first_name={user.first_name}
                last_name={user.last_name}
                phone={user.phone}
            />
        </>
    )
}
