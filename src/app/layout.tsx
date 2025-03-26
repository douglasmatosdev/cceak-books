import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'

import { ToastContainer } from 'react-toastify'
import dynamic from 'next/dynamic'

const LayoutMenu = dynamic(() => import('@/components/LayoutMenu'), { ssr: false })

export const metadata = {
    title: 'CCEAK Books',
    description: 'Uma simples aplicação para gerenciar livros'
}

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
    return (
        <html suppressHydrationWarning={true} lang="en">
            <body>
                <ToastContainer />
                <header className="w-full mb-10">
                    <LayoutMenu />
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
