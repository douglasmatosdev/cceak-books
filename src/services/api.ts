import axios, { AxiosResponse } from 'axios';

const sheet_url = `https://sheet.best/api/sheets/${process.env.NEXT_PUBLIC_SHEET_KEY}`


export const services = {
    google: async (isbn: string) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`);
            return response.data.items[0].volumeInfo;
        } catch (error) {
            console.error('[googleapis] - Error fetching book:', error);
            return null;
        }
    },
    brasilapi: async (isbn: string) => {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/isbn/v1/${isbn}`);
            return response?.data
        } catch (error) {
            console.error('[brasilapi] - Error fetching book:', error);
            return null;
        }
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
                const response = await axios.get<Record<string, Book>>(`${sheet_url}/tabs/books?_format=index`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching getIndexed:', error)
                    })
                const data = response!.data
                return Object.keys(data).map(key => data[key])
            },
            get: async (): Promise<Book[]> => {
                const response = await axios.get<Record<string, Book>>(`${sheet_url}/tabs/books`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching books:', error)
                    })

                return response!.data as unknown as Promise<Book[]>
            },
            getByRowIndex: async (rowIndex: number): Promise<Book> => {
                const response = await axios.get(`${sheet_url}/tabs/books/${rowIndex}`)
                const [data] = await response.data

                return data
            },
            post: async (book: Book): Promise<AxiosResponse> => {
                const response = await axios.post(`${sheet_url}/tabs/books`,
                    JSON.stringify(book),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).catch(error => {
                    console.error(`[Sheet] - Error register book:`, error)
                })

                return response as AxiosResponse
            },
            delete: async (rowIndex: number): Promise<AxiosResponse> => {
                const response = await axios.delete(`${sheet_url}/tabs/books/${rowIndex}`)
                    .catch(error => {
                        console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                    })
                return response as AxiosResponse
            },
            put: async (rowIndex: number, book: Book): Promise<AxiosResponse> => {
                const response = await axios.put(`${sheet_url}/tabs/books/${rowIndex}`,
                    JSON.stringify(book),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).catch(error => {
                    console.error(`[Sheet] - Error update book:`, error)
                })

                return response as AxiosResponse
            },
        },
        users: {
            search: async (term: string): Promise<User> => {
                const response = await axios.get(`${sheet_url}/tabs/users/search?title=*${term}*`)
                const [data] = await response.data

                return data
            },
            getIndexed: async (): Promise<User[]> => {
                const response = await axios.get<Record<string, User>>(`${sheet_url}/tabs/users?_format=index`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching getIndexed:', error)
                    })
                const data = response!.data
                return Object.keys(data).map(key => data[key])
            },
            get: async (): Promise<User[]> => {
                const response = await axios.get<Record<string, User>>(`${sheet_url}/tabs/users`)
                    .catch(error => {
                        console.error('[Sheet] - Error fetching Users:', error)
                    })

                return response!.data as unknown as Promise<User[]>
            },
            getByRowIndex: async (rowIndex: number): Promise<User> => {
                const response = await axios.get(`${sheet_url}/tabs/users/${rowIndex}`)
                const [data] = await response.data

                return data
            },
            post: async (user: User): Promise<AxiosResponse> => {
                const response = await axios.post(`${sheet_url}/tabs/users`,
                    JSON.stringify(user),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).catch(error => {
                    console.error(`[Sheet] - Error register book:`, error)
                })

                return response as AxiosResponse
            },
            delete: async (rowIndex: number): Promise<AxiosResponse> => {
                const response = await axios.delete(`${sheet_url}/tabs/users/${rowIndex}`)
                    .catch(error => {
                        console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                    })
                return response as AxiosResponse
            },
            put: async (rowIndex: number, user: User): Promise<AxiosResponse> => {
                const response = await axios.put(`${sheet_url}/tabs/users/${rowIndex}`,
                    JSON.stringify(user),
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                ).catch(error => {
                    console.error(`[Sheet] - Error update book:`, error)
                })

                return response as AxiosResponse
            },
        },
        lend: {

        }

    }
}
