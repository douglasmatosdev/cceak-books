import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import Image from 'next/image'
import Link from 'next/link'

import dynamic from 'next/dynamic'
import { RxExit } from 'react-icons/rx'

import { ToastContainer } from 'react-toastify'

const AdminLink = dynamic(() => import('@/components/AdminLink'), { ssr: false })

export const metadata = {
    title: 'CCEAK Books',
    description: 'Uma simples aplicação para gerenciar livros'
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <body>
                <ToastContainer />
                <header className="w-full mb-10">
                    <ul className="flex items-center bg-primary w-full px-8 py-4">
                        <li className="flex-1">
                            <Link href={'/'}>
                                <Image
                                    src={'/images/cceak-logo.png'}
                                    width={60}
                                    height={60}
                                    alt={'CCAK Books logo'}
                                    className="rounded-full"
                                />
                            </Link>
                        </li>

                        <li className="text-white uppercase hover:underline">
                            <AdminLink
                                beforeNavigate={{
                                    label: 'Administração',
                                    path: '/pages/dashboard'
                                }}
                                afterNavigate={{
                                    label: (
                                        <div className="flex">
                                            <span className="mr-2">Sair</span>{' '}
                                            <RxExit className="text-2xl" title="Sair" />
                                        </div>
                                    ),
                                    path: '/'
                                }}
                            />
                        </li>
                    </ul>
                </header>

                <div className="flex flex-col flex-1">{children}</div>

                <footer className="w-full h-16  flex flex-col justify-center items-center bg-primary ">
                    <Link
                        href={'https://github.com/douglasmatosdev/cceak-books/blob/main/docs/MANUAL_PT_BR.md'}
                        target="__blank"
                        className="underline text-white text-xl"
                    >
                        Manual
                    </Link>
                </footer>
            </body>
        </html>
    )
}
