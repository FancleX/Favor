import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from './ChatBox.d';

interface Props extends ChatMessage {
    avatar?: string,
}

export default function MessageBox({
    id,
    avatar,
    content,
    timestamp,
    isSender
}: Props) {
    return (
        <View
            style={isSender ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }}
        >



        </View>
    )
}

const styles = StyleSheet.create({
});
