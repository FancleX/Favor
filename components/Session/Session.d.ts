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
