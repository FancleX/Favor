import { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Message } from '../../dev/Dummy';
import { StackScreenProps } from '@react-navigation/stack';
import { MessageStackNavParamList } from '../../router/Navigation';
import Header from './Header';
import { FlatList } from 'react-native-gesture-handler';
import MessageInput from './MessageInput';
import MessageBox from './MessageBox';
import { ChatMessage } from './ChatBox.d';

interface Props extends StackScreenProps<MessageStackNavParamList, 'ChatBox'> { }

export default function ChatBox({ route }: Props) {

    const { contact } = route.params;

    const myAvatar = 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg';

    const myId = '1';
    const myName = 'abc';

    const [chatHistory, setChatHistory] = useState<[string, ChatMessage[]][]>([]);
    const [chatMap, setChatMap] = useState<Map<string, ChatMessage[]>>(new Map());

    const toShortDate = (date: Date) => {
        return date.toLocaleDateString('us-EN', { month: 'short', day: '2-digit' });
    }

    const groupByDate = useCallback(() => {
        if (Message.chatHistoryJohn.length === 0) return;

        const group: Map<string, ChatMessage[]> = new Map();

        Message.chatHistoryJohn.forEach((chat) => {
            const chatDate = toShortDate(chat.timestamp);
            let collection = group.get(chatDate) ?? [];

            collection.push(chat);
            group.set(chatDate, collection);
        });

        setChatMap(group);
        setChatHistory(Array.from(group));
    }, [Message.chatHistoryJohn]);


    useEffect(() => {
        // check and clear unreads

        groupByDate();
    }, [groupByDate]);

    const handleMessageSend = async (text: string) => {
        console.log(text)

        const time = new Date();

        // send to server
        const message: ChatMessage = { id: '106', content: text, isRead: true, isHost: true, timestamp: time };

        // update locally
        const current = toShortDate(time);
        const collection = chatMap.get(current) ?? [];

        collection.push(message);

        chatMap.set(current, collection);

        setChatHistory(Array.from(chatMap));
    }

    return (
        <View style={styles.container}>
            <Header contact={contact} />

            <FlatList
                contentContainerStyle={styles.contentContainer}
                data={chatHistory}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.dateText}>{item[0]}</Text>

                        {
                            item[1].map((chatEntity) => {
                                const data = {
                                    ...chatEntity,
                                    name: chatEntity.isHost ? myName : contact.name,
                                    userId: chatEntity.isHost ? myId : contact.id,
                                    avatar: chatEntity.isHost ? myAvatar : contact.avatar
                                };

                                return (<MessageBox key={chatEntity.id} {...data} />);
                            })
                        }
                    </View>
                )}
                keyExtractor={(item) => item[0]}
                showsVerticalScrollIndicator={false}
                inverted
            />

            <MessageInput onSend={handleMessageSend} />
        </View>
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
        backgroundColor: '#e0e0de',
        padding: 10,
        flexDirection: 'column-reverse'
    },
    dateText: {
        alignSelf: 'center',
        fontSize: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 5,
        margin: 5
    }
});
