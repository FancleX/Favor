import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Badge } from '@rneui/themed';
import Home from './screen/Home';
import Message from './screen/Message';
import Account from './screen/Account';
import CustomDrawer from './components/CustomDrawer';
import SearchHeader from './components/SearchHeader';
import Post from './screen/Post';
import { CategoryType } from './screen/Category';

const Drawer = createDrawerNavigator();

// dummpy
const searchApi = async (query: string): Promise<CategoryType | null> => {
  const formatedQuery = query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();

  if (Object.values(CategoryType).includes(formatedQuery as CategoryType)) {
    return formatedQuery as CategoryType;
  }

  return null;
};
const dummyMessageValue: number = 10;
//

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
            header: ({ navigation }) =>
              <SearchHeader
                searchFunc={searchApi}
                placeholder='Search a category'
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
                {
                  dummyMessageValue > 0 &&
                  <Badge
                    status="error"
                    value={10}
                    containerStyle={{ position: 'absolute', top: 5, left: 20 }}
                  />
                }
              </>
            ),
            header: ({ navigation }) =>
              <SearchHeader
                searchFunc={searchApi}
                placeholder='Search a conversation'
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
  );
}

const styles = StyleSheet.create({
  drawTextStyle: {
    marginLeft: -5
  }
});
