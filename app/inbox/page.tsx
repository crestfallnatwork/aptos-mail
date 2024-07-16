"use client"

import { mails } from '@/app/inbox/data'
import { Inbox } from '@/app/inbox/components/inbox'

export function InboxPage() {
    return (
        <Inbox mails={mails} />
    )
}

export default InboxPage
