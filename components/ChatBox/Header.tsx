import { StyleSheet, View, Text } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootDrawerNavParamList } from '../../router/Navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useState } from 'react';

interface Props {
    contact: {
        name: string,
        id: string
    }
}

export default function Header({
    contact: {
        name,
        id
    },
}: Props) {

    const router = useNavigation<StackNavigationProp<RootDrawerNavParamList>>();
    const [leftIconPress, setLeftIconPress] = useState<boolean>(false);
    const [rightIconPress, setRightIconPress] = useState<boolean>(false);

    return (
        <View style={styles.headerContainer}>
            <TouchableHighlight
                onPressIn={() => setLeftIconPress(true)}
                onPressOut={() => setLeftIconPress(false)}
                onPress={() => router.goBack()}
                underlayColor='#fff'
            >
                <FontAwesome5
                    name='chevron-left'
                    size={15}
                    color={leftIconPress ? 'grey' : undefined}
                />
            </TouchableHighlight>


            <Text style={styles.contactName}>{name}</Text>


            <TouchableHighlight
                onPressIn={() => setRightIconPress(true)}
                onPressOut={() => setRightIconPress(false)}
                onPress={() => console.log(1)}
                underlayColor='#fff'
            >
                <Entypo
                    name='dots-three-horizontal'
                    size={15}
                    color={rightIconPress ? 'grey' : undefined}
                />
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 80,
        paddingTop: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    contactName: {
        fontSize: 20
    },
});
