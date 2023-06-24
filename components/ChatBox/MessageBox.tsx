import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from './ChatBox.d';
import { Avatar } from '@react-native-material/core';

interface Props extends ChatMessage {
    avatar?: string,
    name: string,
    userId: string
}

const renderTimestamp = (timestamp: Date) => {
    return `${timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
};

const ChatBubble: React.FC<{ isHost: boolean, content: string, timestamp: Date }> = ({ isHost, content, timestamp }) => {
    if (isHost) {
        return (
            <View style={chatBubbleStyles.rightBubble}>
                <View>
                    <Text style={{ fontSize: 15, color: '#fff' }}>
                        {content}
                    </Text>
                    <Text style={[chatBubbleStyles.timestamp, { color: '#fff' }]}>
                        {renderTimestamp(timestamp)}
                    </Text>
                </View>
                <View style={chatBubbleStyles.rightArrow}></View>
                <View style={chatBubbleStyles.rightArrowOverlap}></View>
            </View>
        );
    }

    return (
        <View style={chatBubbleStyles.leftBubble}>
            <View>
                <Text style={{ fontSize: 15, color: "#000" }}>
                    {content}
                </Text>
                <Text style={[chatBubbleStyles.timestamp, { color: '#000' }]}>
                    {renderTimestamp(timestamp)}
                </Text>
            </View>
            <View style={chatBubbleStyles.leftArrow}></View>
            <View style={chatBubbleStyles.leftArrowOverlap}></View>
        </View>
    );
};

const chatBubbleStyles = StyleSheet.create({
    leftBubble: {
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 5,
        marginLeft: "6%",
        maxWidth: '70%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },
    leftArrow: {
        position: "absolute",
        backgroundColor: "#fff",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomRightRadius: 25,
        left: -10
    },
    leftArrowOverlap: {
        position: "absolute",
        backgroundColor: '#e0e0de',
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomRightRadius: 18,
        left: -20
    },
    rightBubble: {
        backgroundColor: "#0078fe",
        padding: 10,
        marginTop: 5,
        marginRight: "6%",
        maxWidth: '70%',
        alignSelf: 'flex-end',
        borderRadius: 20,
    },
    rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        width: 20,
        height: 25,
        bottom: 0,
        borderBottomLeftRadius: 25,
        right: -9
    },
    rightArrowOverlap: {
        position: "absolute",
        backgroundColor: "#e0e0de",
        width: 20,
        height: 35,
        bottom: -6,
        borderBottomLeftRadius: 18,
        right: -20
    },
    timestamp: {
        fontSize: 10,
        alignSelf: 'flex-end',
        marginTop: 5
    }
});


export default function MessageBox({
    id,
    userId,
    avatar,
    name,
    content,
    timestamp,
    isHost
}: Props) {
    return (
        <View
            style={
                isHost ?
                    [styles.container, { flexDirection: 'row-reverse' }] :
                    [styles.container, { flexDirection: 'row' }]
            }
        >
            <Avatar
                image={{ uri: avatar }}
                style={styles.avatar}
                imageStyle={styles.avatar}
                size={40}
                label={name}
                autoColor
            />

            <ChatBubble {...{ isHost, content, timestamp }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'flex-end',
    },
    avatar: {
        borderRadius: 5,
    },

});
