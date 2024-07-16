"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Mail} from "@/app/inbox/data"

interface MailDisplayProps {
    mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
    const today = new Date()

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
                <div className="ml-auto flex items-center gap-2">
                </div>
                <Separator orientation="vertical" className="mx-2 h-6" />
            </div>
            <Separator />
            {mail ? (
                <div className="flex flex-1 flex-col">
                    <div className="flex items-start p-4">
                        <div className="flex items-start gap-4 text-sm">
                            <div className="grid gap-1">
                                <div className="flex gap-1">
                                    <div className="font-semibold text-xl">{mail.name}</div>
                                    <div className="line-clamp-1 text-xs/8 text-muted-foreground">
                                      {`<${mail.address}>`}
                                    </div>
                                </div>
                                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                            </div>
                        </div>
                        {mail.date && (
                            <div className="ml-auto text-xs text-muted-foreground">
                                {mail.date}
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                        {mail.text}
                    </div>
                    <Separator className="mt-auto" />
                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No message selected
                </div>
            )}
        </div>
    )
}
