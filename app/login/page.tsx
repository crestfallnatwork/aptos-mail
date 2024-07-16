"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useGlobalState } from "@/lib/globalState"



export function CardWithForm() {
    const router = useRouter()
    const pkey = useGlobalState((state) => state.privateKey)
    const setPkey = useGlobalState((state) => state.setPrivateKey)
    async function handleImport(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const sk = formData.get('private-key')
        setPkey(sk as string)
    }
    return (
        pkey === "" ?
            (<form onSubmit={handleImport}>
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Login with your private key</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Private Key</Label>
                                <Input type="password" id="private-key" name="private-key" required />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex items-end">
                        <Button type="submit" className="flex-1">Import</Button>
                    </CardFooter>
                </Card>
            </form>) :
            router.replace('/')
    )
}

export default function Home() {
    return (
        <main className="flex flex-row min-h-screen justify-center items-center">
            <CardWithForm />
        </main>
    );
}
