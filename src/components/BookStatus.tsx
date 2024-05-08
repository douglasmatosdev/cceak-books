interface BookStatusProps {
    label: Book['status']
    className?: string
}
export const BookStatus = ({ label, className }: BookStatusProps): JSX.Element => {
    const status = {
        label: {
            avaiable: 'disponível',
            borrowed: 'emprestado'
        },
        color: {
            avaiable: 'green-500',
            borrowed: 'red-500'
        }
    }

    return (
        <>
            {label && (
                <span
                    className={`
                        text-${status.color[label]}
                        border-${status.color[label]}
                        font-semibold border-2  rounded-md p-2 ${className}
                    `}
                >
                    {label ? status.label[label] : ''}
                </span>
            )}
        </>
    )
}
