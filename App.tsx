import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './screen/Home';
import Message from './screen/Message';
import Account from './screen/Account';
import CustomDrawer from './components/CustomDrawer';
import SearchHeader from './components/SearchHeader';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Drawer.Navigator
        initialRouteName='Home'
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          drawerLabelStyle: styles.drawTextStyle
        }}
      >
        <Drawer.Screen
          name='Home'
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
            header: () => <SearchHeader />
          }} />

        <Drawer.Screen
          name='Message'
          component={Message}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
            ),
            header: () => <SearchHeader />
          }} />

        <Drawer.Screen
          name='Account'
          component={Account}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="person-outline" size={22} color={color} />
            )
          }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    borderWidth: 5,
    backgroundColor: 'grey'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawTextStyle: {
    marginLeft: -20
  }
});
