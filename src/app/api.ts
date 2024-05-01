import axios, { AxiosResponse } from 'axios';

export const fetchBookDetails = async (isbn: string) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${isbn}`);
        return response.data.items[0].volumeInfo;
    } catch (error) {
        console.error('[googleapis] - Error fetching book:', error);
        return null;
    }
}

const sheet_url = `https://sheet.best/api/sheets/${process.env.NEXT_PUBLIC_SHEET_KEY}`

export const api = {
    sheet: {
        search: async (term: string): Promise<Book> => {
            const response = await axios.get(`${sheet_url}/search?title=*${term}*`)
            const [data] = await response.data

            return data
        },
        getIndexed: async (): Promise<Book[]> => {
            const response = await axios.get<Record<string, Book>>(`${sheet_url}?_format=index`)
                .catch(error => {
                    console.error('[Sheet] - Error fetching getIndexed:', error)
                })
            const data = response!.data
            return Object.keys(data).map(key => data[key])
        },
        get: async (): Promise<Book[]> => {
            const response = await axios.get<Record<string, Book>>(sheet_url)
                .catch(error => {
                    console.error('[Sheet] - Error fetching books:', error)
                })

            return response!.data as unknown as Promise<Book[]>
        },
        getByRowIndex: async (rowIndex: number): Promise<Book> => {
            const response = await axios.get(`${sheet_url}/${rowIndex}`)
            const [data] = await response.data

            return data
        },
        post: async (book: Book): Promise<AxiosResponse> => {
            const response = await axios.post(sheet_url,
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
            const response = await axios.delete(`${sheet_url}/${rowIndex}`)
                .catch(error => {
                    console.error(`[Sheet] - Error deleting rowIndex ${rowIndex}:`, error)
                })
            return response as AxiosResponse
        },
        put: async (rowIndex: number, book: Book): Promise<AxiosResponse> => {
            const response = await axios.put(`${sheet_url}/${rowIndex}`,
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
    }
}
