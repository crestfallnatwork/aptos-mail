"use client"
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export function Compose(props: {
    sendCallback: (to: string, message: string, subject: string) => Promise<void>
}) {
    return (
        <div className="flex h-full flex-col">
            <Separator />
            <div className="flex flex-1 flex-col">
                <form>
                    <div className="grid items-start p-4 gap-4">
                        <div className="flex w-full items-center gap-3">
                            <Label htmlFor="to">
                                <div className="font-bold text-large">To:</div>
                            </Label>
                            <Input id="to" className="grow w-full" type="text" />
                        </div>
                        <div className="flex w-full items-center gap-3">
                            <Label htmlFor="subject">
                                <div className="font-bold text-large">Subject:</div>
                            </Label>
                            <Input id="subject" className="grow w-full" type="text" />
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="grid gap-4">
                            <Label htmlFor="message" className="font-bold">
                                Message:
                            </Label>
                            <Textarea
                                id="message"
                                className="p-4 h-80 border-slate-800"
                            />
                            <div className="flex items-center">
                                <Button
                                    onClick={
                                        async (e) => {
                                            e.preventDefault()
                                            await props.sendCallback("a", "b", "c")
                                        }
                                    }
                                    size="sm"
                                    className="ml-auto"
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
