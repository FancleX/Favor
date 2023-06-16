import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Category } from '../components/Category';
import { Request } from '../components/Request';
import { RootNavParamList } from '../router/Navigation';

const Stack = createStackNavigator<RootNavParamList>();

export default function Home() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack.Navigator
        initialRouteName='Category'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='Category' component={Category} />
        <Stack.Screen name='Request' component={Request} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  )
}
