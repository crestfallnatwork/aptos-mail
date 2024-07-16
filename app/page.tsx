"use client"

import { ComposeBox } from '@/app/compose/components/send'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import InboxPage from "@/app/inbox/page"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useGlobalState } from '@/lib/globalState'
import { FormEvent } from 'react'

export default function ComposePage() {
    const router = useRouter()
    const pkey = useGlobalState((state) => state.privateKey)
    const setPkey = useGlobalState((state) => state.setPrivateKey)
    const handleLogout = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setPkey("")
    }
    return (
      pkey !== "" ? (
        <div>
            <Tabs defaultValue="inbox">
                <div className="flex items-center px-4 py-2 items-stretch">
                    <h1 className="flex-auto text-xl font-bold">
                        <TabsList className="ml-auto">
                            <TabsTrigger
                                value="inbox"
                                className="text-xl font-bold"
                            >
                                Inbox
                            </TabsTrigger>
                            <TabsTrigger
                                value="compose"
                                className="text-xl font-bold"
                            >
                                Compose
                            </TabsTrigger>
                        </TabsList>
                    </h1>
                    <form onSubmit={handleLogout}>
                        <Button variant="destructive" type="submit">
                            Delete Session
                        </Button>
                    </form>
                </div>
                <Separator />
                <TabsContent value="inbox" className="m-0">
                    <InboxPage />
                </TabsContent>
                <TabsContent value="compose" className="m-0">
                    <ComposeBox />
                </TabsContent>
            </Tabs>
        </div>
      ) : router.replace('/login')
    )
}
