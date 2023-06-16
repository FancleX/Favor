import { ImageSourcePropType } from "react-native";

export enum CategoryType {
    BABYSITTING = 'Babysitting',
    DOG_WALKING = 'Dog Walking',
    LAUNDRYING = 'Laundry',
    CAR_WASHING = 'Car Washing',
    HOUSE_CLEANING = 'House Cleaning',
    ITEM_REPAIRING = 'Item Repairing'
}

export interface CategoryItem {
    type: CategoryType,
    image: ImageSourcePropType
}
