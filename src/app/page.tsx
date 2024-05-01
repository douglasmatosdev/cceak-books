'use client'

import { PaginatedBooks } from "@/components/PaginatedBooks"

export default function Home() {

  return (
    <main className="flex flex-col">
      <PaginatedBooks itemsPerPage={10} />
    </main>
  );
}
