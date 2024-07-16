"use client"
import { Mail, mails} from '@/app/inbox/data'
import { Inbox } from '@/app/inbox/components/inbox'
import { useEffect, useState } from 'react'
import { useGlobalState } from '@/lib/globalState'
import { SimpleMessage } from 'acmp-js'
import { v4 as uuidv4 } from 'uuid';
import {Client as ACMP} from 'acmp-js'

function InboxPage({}) {
    const acmp = useGlobalState((state) => state.acmp) as ACMP
    const [mails, setMail] = useState<Mail[]>([])
    const [fetchedTill, setFetchedTill] = useState(0)
    async function newFetchMail(from: number, acmp: ACMP): Promise<Mail[]>{
        return (await acmp.getMessages(from)).map((msg) => {
            const smsg = SimpleMessage.fromMessage(msg.message)
            return {
                id:  uuidv4(),
                name: "unknown",
                subject: smsg.text.split("\n")[0],
                text: smsg.text,
                date: (new Date(Number(msg.timestamp))).toISOString(),
                address: msg.from.toString()
            }
        })
    }
    const pollMail = async () => {
        const newMails = await newFetchMail(fetchedTill, acmp)
        if (newMails.length === 0 ) {
            console.log(fetchedTill)
            return
        }
        setMail(newMails.reverse().concat(mails))
        setFetchedTill(fetchedTill + newMails.length)
    }
    const poll = async () => {
        await pollMail()
        setTimeout(poll, 10000)
    }
    poll()
    return (
        <div>
        <Inbox mails={mails} defaultLayout={[265, 440, 655]}/>
        </div>
    )
}

export default InboxPage
