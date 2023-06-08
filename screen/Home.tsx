import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './Category';
import Request from './Request';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Stack.Navigator
        initialRouteName='Category'
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name='Category' component={Category} />
        <Stack.Screen name='Request' component={Request} />
      </Stack.Navigator>
    </TouchableWithoutFeedback>
  )
}
