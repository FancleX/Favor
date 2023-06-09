import React from 'react'
import { CategoryType } from '../screens/Category'
import { View, Text, ListRenderItem } from 'react-native'

export interface RequestCardData {
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

const RequestCard: ListRenderItem<RequestCardData> = ({ item }) => (
    <View>

    </View>
)


export default RequestCard;
