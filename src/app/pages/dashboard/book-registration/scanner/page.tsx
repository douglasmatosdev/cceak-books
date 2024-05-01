import { Scan } from "@/components/Scan";

export default function Scanner() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className=" text-2xl">Escanear código ISBN</h1>
            <Scan />
        </div>
    )
}