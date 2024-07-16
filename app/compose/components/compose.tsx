"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useGlobalState } from "@/lib/globalState"
import { SimpleMessage, Client as ACMP } from "acmp-js"
import { AccountAddress } from "@aptos-labs/ts-sdk"
import { useRouter } from "next/navigation"

export function Compose() {
    const acmp = useGlobalState(state => state.acmp)
    if (acmp === null) {
        throw new Error("acmp is null")
    }
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const subject = formData.get('subject')
        const text = formData.get('message')
        const to = formData.get('to')
        if (to === null) {
            throw new Error("to field should not be nul")
        }
        console.log(subject, text, to)
        const smsg = new SimpleMessage(subject + "\n" + text, [])
        await acmp.sendMessage(AccountAddress.fromString(to.toString()), smsg.toRawMessage())
        router.push("/")
    }
    return (
        <div className="flex h-full flex-col">
            <Separator />
            <div className="flex flex-1 flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="grid items-start p-4 gap-4">
                        <div className="flex w-full items-center gap-3">
                            <Label htmlFor="to">
                                <div className="font-bold text-large">To:</div>
                            </Label>
                            <Input id="to" name="to" className="grow w-full" type="text" required />
                        </div>
                        <div className="flex w-full items-center gap-3">
                            <Label htmlFor="subject">
                                <div className="font-bold text-large">Subject:</div>
                            </Label>
                            <Input id="subject" name="subject" className="grow w-full" type="text" />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid gap-4">
                            <Label htmlFor="message" className="font-bold">
                                Message:
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                className="p-4 h-80 border-slate-800"
                            />
                            <div className="flex items-center">
                                <Button
                                    size="sm"
                                    className="ml-auto"
                                    type="submit"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
