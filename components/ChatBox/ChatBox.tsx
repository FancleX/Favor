import { useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Message } from '../../dev/Dummy';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../../router/Navigation';
import ChatBoxHeader from './ChatBoxHeader';

interface Props extends StackScreenProps<RootNavParamList, 'ChatBox'> { }

export default function ChatBox({ route }: Props) {

    const { contact } = route.params;

    useEffect(() => {
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ChatBoxHeader contact={contact} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        width: '100%',
        height: 50,
        padding: 10,
        textAlign: 'center'
    }
});