import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Badge } from '@react-native-material/core';
import Home from './screens/Home';
import Message from './screens/Message';
import Account from './screens/Account';
import CustomDrawer from './components/CustomDrawer';
import SearchHeader from './components/SearchHeader';
import Post from './screens/Post';
import { MessageDrawer } from './dev/Dummy';
import { RootNavParamList } from './types/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';

const Drawer = createDrawerNavigator<RootNavParamList>();

export default function App() {
  return (
    <RootSiblingParent>
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
              header: ({ navigation }) =>
                <SearchHeader
                  placeholder='Search a category'
                  type='Category'
                  navigation={navigation}
                />
            }} />

          <Drawer.Screen
            name='Post'
            component={Post}
            options={{
              drawerIcon: ({ color }) => (
                <FontAwesome name="send-o" size={22} color={color} />
              )
            }} />

          <Drawer.Screen
            name='Message'
            component={Message}
            options={{
              drawerIcon: ({ color }) => (
                <>
                  <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
                  <Badge
                    label={MessageDrawer.messageNumber}
                    color='red'
                    style={styles.badge}
                    labelStyle={styles.badgeLabel}
                  />
                </>
              ),
              header: ({ navigation }) =>
                <SearchHeader
                  placeholder='Search a conversation'
                  type='Message'
                  navigation={navigation}
                />
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
    </RootSiblingParent>

  );
}

const styles = StyleSheet.create({
  drawTextStyle: {
    marginLeft: -5
  },
  badge: {
    position: 'absolute',
    top: 5,
    left: 20,
    height: 18
  },
  badgeLabel: {
    color: '#fff',
    fontSize: 11
  }
});
