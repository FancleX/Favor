import { View, Text, StyleSheet } from 'react-native';
import { ChatMessage } from './ChatBox.d';
import { Avatar } from '@react-native-material/core';

interface Props extends ChatMessage {
    avatar?: string,
    name: string,
    userId: string
}

const ChatBubble: React.FC<{ isHost: boolean, content: string, timestamp: Date }> = ({ isHost, content, timestamp }) => {
    if (isHost) {
        return (
            <View style={{
                backgroundColor: "#0078fe",
                padding: 10,
                marginLeft: '45%',
                marginTop: 5,
                marginRight: "7%",
                maxWidth: '50%',
                alignSelf: 'flex-end',
                borderRadius: 20,
            }}
            >
                <Text style={{ fontSize: 16, color: "#fff", }}>{content}</Text>
                <View style={chatBubbleStyles.rightArrow}></View>
                <View style={chatBubbleStyles.rightArrowOverlap}></View>
            </View>
        );
    }

    return (
        <View style={{
            backgroundColor: "#dedede",
            padding: 10,
            borderRadius: 5,
            marginTop: 5,
            marginLeft: "5%",
            maxWidth: '50%',
            alignSelf: 'flex-start',
            //maxWidth: 500,
            //padding: 14,

            //alignItems:"center",
            // borderRadius: 20,
        }}
        >
            <Text style={{ fontSize: 16, color: "#000", justifyContent: "center" }}>{content}</Text>
            <View style={chatBubbleStyles.leftArrow}></View>
            <View style={chatBubbleStyles.leftArrowOverlap}></View>
        </View>
    );
};

const chatBubbleStyles = StyleSheet.create({
    leftArrow: {
        position: "absolute",
        backgroundColor: "#dedede",
        //backgroundColor:"red",
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
    rightArrow: {
        position: "absolute",
        backgroundColor: "#0078fe",
        // backgroundColor: 'red',
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
                size={30}
                label={name}
                autoColor
            />

            <ChatBubble {...{ isHost, content, timestamp }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    avatar: {
        borderRadius: 5,
    },

});
