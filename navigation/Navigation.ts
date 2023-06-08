import { CategoryType } from "../screen/Category"

export type RootstackParamList = {
    Account: undefined,
    Category: undefined,
    Home: undefined,
    Message: undefined,
    Post: undefined,
    Request: { categoryType: CategoryType }
}
