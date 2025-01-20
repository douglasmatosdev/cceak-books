import { GoogleSpreadsheetWorksheet, RawRowData } from 'google-spreadsheet'
import { Sheet } from '@/enums/sheets'
import { Row, SpreadsheetResponse } from '@/types/spreadsheet'
import { getGoogleSpreadsheet } from './google-spreadsheet'

export const getRowIndexById = async (
    spreadsheet: GoogleSpreadsheetWorksheet,
    id: string
): Promise<number | undefined> => {
    const rawRows = await spreadsheet.getRows()

    let rowIndex

    rawRows.forEach(row => {
        const rowId = row.get('id')

        if (rowId === id) {
            rowIndex = row._rowNumber
        }
    })

    return rowIndex
}

export const rawRowsToRows = async (spreadsheet: GoogleSpreadsheetWorksheet): Promise<Row[]> => {
    const rawRows = await spreadsheet.getRows()

    const rows = rawRows.map(row => {
        const header = row._worksheet.headerValues
        const data = row._rawData

        return header.reduce((acc: Row, headerName: string, index: number) => {
            acc[headerName] = data[index]
            acc.rowIndex = row._rowNumber

            return acc
        }, {})
    })

    return rows
}
export const fetchGoogleSheets = async (): Promise<SpreadsheetResponse> => {
    try {
        const doc = await getGoogleSpreadsheet()

        const rawBooksSpreadSheet = doc.sheetsByTitle[Sheet.books]
        const rawUsersSpreadSheet = doc.sheetsByTitle[Sheet.users]
        const rawLendsSpreadSheet = doc.sheetsByTitle[Sheet.lends]

        const books = await rawRowsToRows(rawBooksSpreadSheet)
        const users = await rawRowsToRows(rawUsersSpreadSheet)
        const lends = await rawRowsToRows(rawLendsSpreadSheet)

        const sheets = {
            books,
            users,
            lends
        }

        const rawSheets = {
            books: rawBooksSpreadSheet,
            users: rawUsersSpreadSheet,
            lends: rawLendsSpreadSheet
        }

        const getRowById = async (id: string, sheet: Sheet): Promise<Row> =>
            sheets[sheet].find(book => book.id === id) ?? {}
        const addRow = async (sheet: Sheet, rowData: RawRowData): Promise<void> => {
            await rawSheets[sheet].addRow(rowData, { insert: true, raw: true })
        }
        const deleteRow = async (id: string, sheet: Sheet): Promise<void> => {
            const rowIndex = await getRowIndexById(rawSheets[sheet], id)
            if (rowIndex === undefined) {
                return
            }
            const rows = await rawSheets[sheet].getRows()
            const row = rows.find(row => row._rowNumber === rowIndex)

            if (row) {
                await row.delete()
            }
        }

        const updateRow = async (id: string, sheet: Sheet, data: Row): Promise<void> => {
            const rowIndex = await getRowIndexById(rawSheets[sheet], id)
            if (rowIndex === undefined) {
                return
            }
            const rows = await rawSheets[sheet].getRows()
            const row = rows.find(row => row._rowNumber === rowIndex)

            if (row) {
                row.assign(data)

                row.save()
            }
        }

        return {
            get: sheets,
            getRowById: {
                books: (id: string) => getRowById(id, Sheet.books),
                users: (id: string) => getRowById(id, Sheet.users),
                lends: (id: string) => getRowById(id, Sheet.lends)
            },
            add: {
                books: (data: Row) => addRow(Sheet.books, data),
                users: (data: Row) => addRow(Sheet.users, data),
                lends: (data: Row) => addRow(Sheet.lends, data)
            },
            delete: {
                books: (id: string) => deleteRow(id, Sheet.books),
                users: (id: string) => deleteRow(id, Sheet.users),
                lends: (id: string) => deleteRow(id, Sheet.lends)
            },
            update: {
                books: (id: string, data: Row) => updateRow(id, Sheet.books, data),
                users: (id: string, data: Row) => updateRow(id, Sheet.users, data),
                lends: (id: string, data: Row) => updateRow(id, Sheet.lends, data)
            }
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error)
    }

    return {
        get: {
            books: [],
            users: [],
            lends: []
        },
        getRowById: {
            books: async () => ({}),
            users: async () => ({}),
            lends: async () => ({})
        },
        add: {
            books: async () => {},
            users: async () => {},
            lends: async () => {}
        },
        delete: {
            books: async () => {},
            users: async () => {},
            lends: async () => {}
        },
        update: {
            books: async () => {},
            users: async () => {},
            lends: async () => {}
        }
    }
}
