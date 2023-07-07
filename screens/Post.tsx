import { createStackNavigator } from '@react-navigation/stack';
import { PostStackNavParamList } from '../router/Navigation';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { PostForm } from '../components/PostForm';

const Stack = createStackNavigator<PostStackNavParamList>();

export default function Post() {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Stack.Navigator
                initialRouteName='PostForm'
                screenOptions={{ headerShown: false }}
            >

                <Stack.Screen name='PostForm' component={PostForm} />
                {/* <Stack.Screen name='StatusPage' component={StatusPage} /> */}
            </Stack.Navigator>
        </TouchableWithoutFeedback>
    )
}
