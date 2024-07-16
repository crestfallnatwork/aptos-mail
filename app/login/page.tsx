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

export function CardWithForm() {
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login with your private key</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Private Key</Label>
                            <Input type="password" id="private-key" placeholder="" />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex items-end">
                <Button className="flex-1">Import</Button>
            </CardFooter>
        </Card>
    )
}
export default function Home() {
    return (
      <main className="flex flex-row min-h-screen justify-center items-center">
      <CardWithForm/>
      </main>
    );
}
