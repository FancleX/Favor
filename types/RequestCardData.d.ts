export type RequestCardData = {
    id: string,
    poster: {
        name: string,
        avatar?: string,
        phone?: number,
        email: string
    },
    category: CategoryType,
    address: {
        location: string,
        longitude: number,
        latitude: number
    },
    postDate: Date,
    description: string,
    startTime?: Date,
    endTime?: Date,
    pay: number
}
