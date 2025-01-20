import { fetchGoogleSheets } from '@/services/spreadsheetToDTO'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
    const spreadsheet = await fetchGoogleSheets()

    const body = await req.json()

    const { searchParams } = new URL(req.url)

    const auth = searchParams.get('auth')

    if (auth) {
        const userAdmin = spreadsheet.get.auth

        if (userAdmin) {
            if (userAdmin.username !== body.username || userAdmin.password !== body.password) {
                return NextResponse.json({ status: 401 })
            }

            if (userAdmin.username === body.username && userAdmin.password === body.password) {
                return NextResponse.json({ cceakLogged: 'yes' }, { status: 200 })
            }
        }

        return NextResponse.json({ status: 401 })
    }

    return NextResponse.json({ status: 401 })
}
