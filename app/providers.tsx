'use client'

import { SessionProvider } from "next-auth/react"
//the sessionProvider has to be a client component, that's why we created this providers component
export function  Providers({children}:{
    children:React.ReactNode
}) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}