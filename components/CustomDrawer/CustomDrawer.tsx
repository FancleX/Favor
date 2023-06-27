import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from '@rneui/themed';
import { useState } from 'react';

export default function CustomDrawer(props: DrawerContentComponentProps) {

    const [login, setLogin] = useState<boolean>(false);

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
                <TouchableOpacity onPress={() => setLogin(!login)}>
                    <View style={styles.signInOutButton}>
                        {
                            login ?
                                <MaterialCommunityIcons name='logout-variant' size={22} /> :
                                <MaterialCommunityIcons name='login-variant' size={22} />
                        }
                        <Text style={styles.signInOutText}>{`Sign ${login ? 'Out' : 'In'}`}</Text>
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
        marginLeft: 20
    },
    body: {
        paddingTop: 10,
        backgroundColor: '#fff'
    },
    bottom: {
        padding: 20
    },
    signInOutButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signInOutText: {
        paddingLeft: 25
    }
});
