'use client'
import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"
import { fetchBookDetails } from "../app/api"
import { GoogleApiBooks } from "@/types/google-api-book"

export const Scanner = () => {
    const [scanResult, setScanResult] = useState<null | string>(null)
    const [bookInfo, setBookInfo] = useState<GoogleApiBooks | Record<string, never>>({})

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
        }

        scanner.render(success, error)

        return () => {
            scanner.clear()
        }
    }, [])


    const search = async (code: string) => {
        const bookDetails = await fetchBookDetails(code);
        console.log(bookDetails);

        setBookInfo(bookDetails);
    }
    console.log(bookInfo);

    if (scanResult) {
        return (
            <div className="w-screen md:w-full flex flex-col items-center justify-center border">
                <h2>Succcess: {scanResult}</h2>
                <button
                    onClick={() => search(scanResult)}
                    className="py-4 px-6 bg-green-500 rounded-lg text-white"
                >search</button>
            </div>
        )
    }

    return (
        <div className="w-screen md:w-full px-4 flex justify-center">
            <div className="w-full " id="reader"></div>
        </div>
    )
}