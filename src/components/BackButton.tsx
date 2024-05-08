import { useRouter } from 'next/navigation'
import { IoArrowBackCircleOutline } from 'react-icons/io5'

interface BackButtonProps {
    classNameContainer?: string
    classNameIcon?: string
}
export const BackButton = ({ classNameContainer, classNameIcon }: BackButtonProps): JSX.Element => {
    const router = useRouter()

    return (
        <div className={`${classNameContainer} flex items-center`} onClick={() => router.back()}>
            <IoArrowBackCircleOutline className={`${classNameIcon} mr-2`} />
            Voltar
        </div>
    )
}
