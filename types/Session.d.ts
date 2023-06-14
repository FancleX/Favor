export type SessionData = {
    avatar?: string,
    contactName: {
        id: string,
        name: string
    },
    latestMessage: {
        date: Date,
        content: string
    },
    unReads: number
}

export type ChatMessage = {
    id: number,
    content: string,
    timestamp: Date,
    isRead: boolean,
    isSender: boolean
}
