export type SessionData = {
    contact: {
        id: string,
        name: string,
        avatar?: string,
    },
    latestMessage: {
        date: Date,
        content: string
    },
    unReads: number
}
