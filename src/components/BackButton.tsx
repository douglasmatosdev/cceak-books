import { IoArrowBackCircleOutline } from 'react-icons/io5'

interface BackButtonProps {
    classNameContainer: string
    classNameIcon: string
}
export const BackButton = ({ classNameContainer, classNameIcon }: BackButtonProps): JSX.Element => {
    return (
        <div className={classNameContainer}>
            <IoArrowBackCircleOutline className={classNameIcon} />
        </div>
    )
}
