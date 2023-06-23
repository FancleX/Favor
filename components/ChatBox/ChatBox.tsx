import { useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Message } from '../../dev/Dummy';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavParamList } from '../../router/Navigation';
import Header from './Header';
import { FlatList } from 'react-native-gesture-handler';
import MessageInput from './MessageInput';
import MessageBox from './MessageBox';

interface Props extends StackScreenProps<RootNavParamList, 'ChatBox'> { }

export default function ChatBox({ route }: Props) {

    const { contact } = route.params;

    const myAvatar = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-photo%2Fimage-colorful-galaxy-sky-generative-ai_37741252.htm&psig=AOvVaw2vvw8M6W-4AUTf1hz6q6rx&ust=1687465612569000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPCygraZ1f8CFQAAAAAdAAAAABAE';

    const myId = '1';
    const myName = 'abc';

    useEffect(() => {
        // check and clear unreads

    }, []);

    const handleMessageSend = async (text: string) => {
        console.log(text)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Header contact={contact} />

                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={Message.chatHistoryJohn}
                    renderItem={({ item }) => {
                        const data = {
                            ...item,
                            name: item.isHost ? myName : contact.name,
                            userId: item.isHost ? myId : contact.id,
                            avatar: item.isHost ? myAvatar : contact.avatar
                        };

                        return (<MessageBox {...data} />);
                    }}
                    keyExtractor={(item) => item.id}
                />

                <MessageInput
                    onSend={handleMessageSend}
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
    contentContainer: {
        flex: 1,
        backgroundColor: '#e0e0de',
        padding: 10,
        height: 'auto'
    }
});
