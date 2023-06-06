import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from '@rneui/themed';

export default function CustomDrawer(props: DrawerContentComponentProps) {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.top}>
                    <FontAwesomeIcons name="hands-helping" size={25} />
                    <Text style={styles.logoText}>Favor</Text>
                </View>

                <Divider width={0.7} />

                <View style={styles.body}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>

            <Divider inset={true} insetType="left" />

            <View style={styles.bottom}>
                <TouchableOpacity>
                    <View style={styles.signOutButton}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10
    },
    body: {
        paddingTop: 10,
        backgroundColor: '#fff'
    },
    bottom: {
        padding: 20
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signOutText: {
        paddingLeft: 10
    }
});
