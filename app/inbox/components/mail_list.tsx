import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail } from "@/app/inbox/data"
import { useMail } from "@/app/inbox/usemail"

interface MailListProps {
    items: Mail[]
}

export function MailList({ items }: MailListProps) {
    const [mail, setMail] = useMail()

    return (
        items.length != 0 ? (
            <ScrollArea className="h-screen">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                mail.selected === item.id && "bg-muted"
                            )}
                            onClick={() =>
                                setMail({
                                    ...mail,
                                    selected: item.id,
                                })
                            }
                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">{item.name}</div>
                                        <div className="text-muted-foreground text-xs/7">{`<${item.address}>`}</div>
                                    </div>
                                    <div
                                        className={cn(
                                            "ml-auto text-xs",
                                            mail.selected === item.id
                                                ? "text-foreground"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {formatDistanceToNow(new Date(item.date), {
                                            addSuffix: true,
                                        })}
                                    </div>
                                </div>
                                <div className="text-xs font-medium">{item.subject}</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {item.text.substring(0, 300)}
                            </div>
                        </button>
                    ))}
                </div>
            </ScrollArea>
        ) : (
            <div> nothing to see here </div>
        )
    )
}

export default MailList
