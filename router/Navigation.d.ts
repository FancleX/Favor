import { CategoryType } from "../components/Category/Category";
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootDrawerNavParamList = {
    Account: undefined,
    Home: NavigatorScreenParams<HomeStackNavParamList>,
    Message: NavigatorScreenParams<MessageStackNavParamList>,
    Post: undefined,
}

export type HomeStackNavParamList = {
    Category: undefined,
    Request: { categoryType: CategoryType },
}

export type MessageStackNavParamList = {
    MessageBox: undefined,
    ChatBox: { contact: { name: string, id: string, avatar?: string } },
}
