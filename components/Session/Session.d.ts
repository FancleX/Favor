export type SessionData = {
    avatar?: string,
    contact: {
        id: string,
        name: string
    },
    latestMessage: {
        date: Date,
        content: string
    },
    unReads: number
}
