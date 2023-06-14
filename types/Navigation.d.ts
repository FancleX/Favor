import { CategoryType } from "../components/Category";

export type RootNavParamList = {
    Account: undefined,
    Category: undefined,
    Home: undefined,
    Message: undefined,
    Post: undefined,
    Request: { categoryType: CategoryType },
    MessageBox: undefined,
    ChatBox: { contactId: number },
}
