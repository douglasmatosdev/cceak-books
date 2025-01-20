import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {
    const cceakLogged = request.cookies.get('cceak-logged')

    if (!cceakLogged) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/((?!auth|_next/static|_next/image|favicon.ico|images|icons|scripts).*)']
}
