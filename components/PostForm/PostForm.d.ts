import { CategoryType } from '../Category';

export type FormEntity = {
    label: string,
    isOptional: boolean,
    autoSize: boolean,
    type: FormType,
}

export enum FormType {
    Normal,
    Address,
    Currency,
    Date,
    Phone,
    CategorySelect,
}

export type FormSubmitData = {
    poster: {
        userId: string
        phone?: string,
    },
    category: CategoryType
    address: {
        location: string,
        latitude: number,
        longitude: number
    },
    postDate: Date,
    description: string,
    startTime: Date,
    endTime: Date,
    pay: number
}
