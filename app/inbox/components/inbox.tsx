"use client"

import * as React from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MailDisplay } from "@/app/inbox/components/mail"
import { MailList } from "@/app/inbox/components/mail_list"
import { type Mail } from "@/app/inbox/data"
import { useMail } from "@/app/inbox/usemail"

interface MailProps {
    mails: Mail[]
    defaultLayout: number[] | undefined
}

export function Inbox({
    mails,
    defaultLayout = [265, 440, 655]
}: MailProps) {
    const [mail] = useMail()

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                    <Tabs defaultValue="all">
                        <div className="flex items-center px-4 py-2">
                            <h1 className="text-xl font-bold"></h1>
                            <TabsList className="ml-auto">
                                <TabsTrigger
                                    value="all"
                                    className="text-zinc-600 dark:text-zinc-200"
                                >
                                    All mail
                                </TabsTrigger>
                                <TabsTrigger
                                    value="unread"
                                    className="text-zinc-600 dark:text-zinc-200"
                                >
                                    Unread
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <Separator />
                        <TabsContent value="all" className="m-0">
                            <MailList items={mails} />
                        </TabsContent>
                        <TabsContent value="unread" className="m-0">
                            <MailList items={mails.filter((item) => !item.read)} />
                        </TabsContent>
                    </Tabs>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <MailDisplay
                        mail={mails.find((item) => item.id === mail.selected) || null}
                    />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    )
}
