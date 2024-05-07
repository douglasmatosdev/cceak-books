/* eslint-disable camelcase */
import axios, { AxiosResponse } from 'axios'

const sheet_url = `https://sheet.best/api/sheets/${process.env.NEXT_PUBLIC_SHEET_KEY}`

export const services = {
    google: async (isbn: string): Promise<GoogleApiBooks> => {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`)

        return response?.data?.items[0]?.volumeInfo
    },
    brasilapi: async (isbn: string): Promise<BrasilapiBook> => {
        const response = await axios.get(`https://brasilapi.com.br/api/isbn/v1/${isbn}`)

        return response?.data
    }
}

export const api = {
    sheet: {
        books: {
            search: async (term: string): Promise<Book> => {
                const response = await axios.get(`${sheet_url}/tabs/books/search?title=*${term}*`)
                const [data] = await response.data

                return data
            },
            getIndexed: async (): Promise<Book[]> => {
                const response = await axios
                    .get<Record<string, Book>>(`${sheet_url}/tabs/books?_format=index`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching getIndexed:', error)
                    })
                const data = response!.data

                return Object.keys(data).map(key => data[key])
            },
            get: async (): Promise<Book[]> => {
                const response = await axios.get<Record<string, Book>>(`${sheet_url}/tabs/books`).catch(error => {
                    console.error('[Sheet] - Error fetching books:', error)
                })

                return response!.data as unknown as Promise<Book[]>
            },
            getByRowIndex: async (rowIndex: string): Promise<Book> => {
                const response = await axios.get(`${sheet_url}/tabs/books/${rowIndex}`)
                const [data] = await response.data

                return data
            },
            post: async (book: Book): Promise<AxiosResponse> => {
                const response = await axios
                    .post(`${sheet_url}/tabs/books`, JSON.stringify(book), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error register book:`, error)
                    })

                return response as AxiosResponse
            },
            delete: async (rowIndex: string): Promise<AxiosResponse> => {
                const response = await axios.delete(`${sheet_url}/tabs/books/${rowIndex}`).catch(error => {
                    console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                })

                return response as AxiosResponse
            },
            put: async (rowIndex: string, book: Book): Promise<AxiosResponse> => {
                const response = await axios
                    .put(`${sheet_url}/tabs/books/${rowIndex}`, JSON.stringify(book), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error update book:`, error)
                    })

                return response as AxiosResponse
            },
            putByColumn: async (colmunName: string, value: string, book: Book): Promise<AxiosResponse> => {
                const response = await axios
                    .put(`${sheet_url}/tabs/books/${colmunName}/${value}`, JSON.stringify(book), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error update book:`, error)
                    })

                return response as AxiosResponse
            }
        },
        users: {
            search: async (term: string): Promise<User> => {
                const response = await axios.get(`${sheet_url}/tabs/users/search?title=*${term}*`)
                const [data] = await response.data

                return data
            },
            getIndexed: async (): Promise<User[]> => {
                const response = await axios
                    .get<Record<string, User>>(`${sheet_url}/tabs/users?_format=index`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching getIndexed:', error)
                    })
                const data = response!.data

                return Object.keys(data).map(key => ({ ...data[key], rowIndex: key }))
            },
            get: async (): Promise<User[]> => {
                const response = await axios.get<Record<string, User>>(`${sheet_url}/tabs/users`).catch(error => {
                    console.error('[Sheet] - Error fetching Users:', error)
                })

                return response!.data as unknown as Promise<User[]>
            },
            getByRowIndex: async (rowIndex: string): Promise<User> => {
                const response = await axios.get(`${sheet_url}/tabs/users/${rowIndex}`)
                const [data] = await response.data

                return data
            },
            post: async (user: User): Promise<AxiosResponse> => {
                const response = await axios
                    .post(`${sheet_url}/tabs/users`, JSON.stringify(user), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error register book:`, error)
                    })

                return response as AxiosResponse
            },
            delete: async (rowIndex: string): Promise<AxiosResponse> => {
                const response = await axios.delete(`${sheet_url}/tabs/users/${rowIndex}`).catch(error => {
                    console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                })

                return response as AxiosResponse
            },
            put: async (rowIndex: string, user: User): Promise<AxiosResponse> => {
                const response = await axios
                    .put(`${sheet_url}/tabs/users/${rowIndex}`, JSON.stringify(user), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error update book:`, error)
                    })

                return response as AxiosResponse
            }
        },
        lends: {
            search: async (term: string): Promise<Lend> => {
                const response = await axios.get(`${sheet_url}/tabs/lends/search?title=*${term}*`)
                const [data] = await response.data

                return data
            },
            getIndexed: async (): Promise<Lend[]> => {
                const response = await axios
                    .get<Record<string, Lend>>(`${sheet_url}/tabs/lends?_format=index`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching getIndexed:', error)
                    })
                const data = response!.data

                return Object.keys(data)
                    .map(key => ({ ...data[key], rowIndex: key }))
                    .filter(d => d.first_name)
            },
            get: async (): Promise<Lend[]> => {
                const response = await axios.get<Record<string, Lend>>(`${sheet_url}/tabs/lends`).catch(error => {
                    console.error('[Sheet] - Error fetching Lends:', error)
                })

                return response!.data as unknown as Promise<Lend[]>
            },
            getByRowIndex: async (rowIndex: string): Promise<Lend> => {
                const response = await axios.get(`${sheet_url}/tabs/lends/${rowIndex}`)
                const [data] = await response.data

                return data
            },
            post: async (lend: Lend): Promise<AxiosResponse> => {
                const response = await axios
                    .post(`${sheet_url}/tabs/lends`, JSON.stringify(lend), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error register book:`, error)
                    })

                return response as AxiosResponse
            },
            delete: async (rowIndex: string): Promise<AxiosResponse> => {
                const response = await axios.delete(`${sheet_url}/tabs/lends/${rowIndex}`).catch(error => {
                    console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                })

                return response as AxiosResponse
            },
            put: async (rowIndex: string, lend: Lend): Promise<AxiosResponse> => {
                const response = await axios
                    .put(`${sheet_url}/tabs/lends/${rowIndex}`, JSON.stringify(lend), {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .catch(error => {
                        console.error(`[Sheet] - Error update book:`, error)
                    })

                return response as AxiosResponse
            }
        }
    }
}
