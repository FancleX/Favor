import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RootNavParamList } from '../types/Navigation';
import SessionBox from '../components/SessionBox';
import ChatBox from '../components/ChatBox';

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
