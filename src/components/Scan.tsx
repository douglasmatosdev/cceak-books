'use client'
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import Link from "next/link"

export const Scan = () => {
    const [scanResult, setScanResult] = useState<null | string>(null)

    useEffect(() => {

        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox: {
                    width: 250,
                    height: 250
                },
                fps: 5
            },
            false
        )

        function success(result: string): void {
            scanner.clear()
            setScanResult(result)
        }

        function error(err: string) {
            console.warn(err)
            scanner.resume()
            scanner.clear()
        }

        scanner.render(success, error)

        return () => {
            scanner.clear()
        }
    }, [])


    if (scanResult) {
        return (
            <div className="w-screen md:w-full flex flex-col items-center justify-center">
                <h2>Succcess: {scanResult}</h2>
                <Link
                    href={`/pages/dashboard/book-registration/${scanResult}`}
                    className="py-4 px-6 bg-green-500 rounded-lg text-white"
                >
                    Pesquisar
                </Link>
            </div>
        )
    }

    return (
        <div className="flex justify-center  border-4 border-black">
            <div className="w-full" id="reader"></div>
        </div>
    )
}