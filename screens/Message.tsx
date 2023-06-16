import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RootNavParamList } from '../router/Navigation';
import { SessionBox } from '../components/Session';
import { ChatBox } from '../components/ChatBox';

const Stack = createStackNavigator<RootNavParamList>();

export default function Message() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack.Navigator
        initialRouteName='MessageBox'
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name='MessageBox' component={SessionBox} />
        <Stack.Screen name='ChatBox' component={ChatBox} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  )
}
