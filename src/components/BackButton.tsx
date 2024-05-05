import { IoArrowBackCircleOutline } from "react-icons/io5";

interface BackButtonProps {
    classNameContainer: string
    classNameIcon: string
}
export const BackButton = ({
    classNameContainer,
    classNameIcon
}: BackButtonProps) => {
    return (
        <div className={classNameContainer}>
            <IoArrowBackCircleOutline className={classNameIcon} />
        </div>
    )
}