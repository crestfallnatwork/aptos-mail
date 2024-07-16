"use client"

import { Compose } from './components/compose'
import { ComposeBox } from './components/send'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

function ComposePage() {
    return (
        <div>
            <Tabs defaultValue="inbox">
                <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">
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
                </div>
                <Separator />
                <TabsContent value="inbox" className="m-0">
                </TabsContent>
                <TabsContent value="compose" className="m-0">
                    <ComposeBox/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ComposePage
