"use client"

import * as React from "react"
import {Compose} from './compose'
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

export function ComposeBox({
    defaultLayout = [265, 440, 655]
} ) {
    return (
        <div>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`
                }}
                className="h-full max-h-[1000px] items-stretch"
            >
                <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                        <Separator />
                        <div className="m-0">
                            <Compose/>
                        </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}
