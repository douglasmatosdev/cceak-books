import { atom } from 'jotai'

export const booksAtom = atom<Book[]>([])

export const lendsAtom = atom<Lend[]>([])

export const usersAtom = atom<User[]>([])
