import { CategoryType } from "../screens/Category";

export type RootNavParamList = {
    Account: undefined;
    Category: undefined;
    Home: undefined;
    Message: undefined;
    Post: undefined;
    Request: { categoryType: CategoryType };
}
