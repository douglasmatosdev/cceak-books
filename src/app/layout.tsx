import Image from 'next/image'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'CCEAK Books',
  description: 'Uma simples aplicação para gerenciar livros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>
        <header className="w-full mb-10">
          <ul className="flex justify-between items-center bg-primary w-full px-8 py-4">
            <li className="">
              <Link href={"/"}>
                <Image src={"/images/cceak-books.png"} width={60} height={60} alt={"CCAK Books logo"} />
              </Link>
            </li>
            <li className="text-white uppercase hover:underline">
              <Link href={"/pages/dashboard"}>Administração</Link>
            </li>
          </ul>
        </header>

        <div className='flex flex-col flex-1'>
          {children}
        </div>

        <footer className='w-full h-16  flex flex-col justify-center items-center bg-primary '>
        </footer>
      </body>
    </html>
  )
}
