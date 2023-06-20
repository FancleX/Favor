import { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, TextInputContentSizeChangeEventData, NativeSyntheticEvent } from 'react-native';
import { Message } from '../../dev/Dummy';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../../router/Navigation';
import Header from './Header';
import { FlatList } from 'react-native-gesture-handler';
import MessageInput from './MessageInput';

interface Props extends StackScreenProps<RootNavParamList, 'ChatBox'> { }

export default function ChatBox({ route }: Props) {

    const { contact } = route.params;
    const [listHeight, setListHeight] = useState<string>('70%');

    useEffect(() => {
        // check and clear unreads

    }, []);

    const onHeightChage = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const { contentSize: { height } } = e.nativeEvent;

        console.log(height)
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header contact={contact} />

                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={Message.chatHistoryJohn}
                    renderItem={({ item }) => <Text>{item.content}</Text>}
                />

                <MessageInput
                    onSend={async (text) => { console.log(text) }}
                    onContentSizeChange={onHeightChage}
                />
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
    },
    messageContainer: {

    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'grey',
        padding: 10
    }
});
