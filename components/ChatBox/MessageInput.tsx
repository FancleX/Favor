import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight, Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    onSend(text: string): Promise<void>
}


export default function MessageInput({
    onSend,
}: Props) {

    const [value, setValue] = useState<string>('');
    const [isOnSend, setIsOnSend] = useState<boolean>(false);

    useEffect(() => {
        // load unsend message
    }, []);


    const handleOnSend = async () => {
        if (value.trim().length > 0) {
            Keyboard.dismiss();

            await onSend(value);

            setValue('');
        }
    };

    return (
        <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
            <TextInput
                placeholder='Type your message'
                multiline
                onChangeText={setValue}
                value={value}
                style={styles.textInput}
            />

            <TouchableHighlight
                onPressIn={() => setIsOnSend(true)}
                onPressOut={() => setIsOnSend(false)}
                onPress={handleOnSend}
                underlayColor='lightgrey'
                style={styles.sendButton}
            >
                <Ionicons
                    name='send'
                    size={25}
                    color={isOnSend ? 'grey' : undefined}
                />
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '70%',
        margin: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        padding: 10,
        minHeight: 40,
        maxHeight: 200,
    },
    sendButton: {
        width: 80,
        height: 50,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        opacity: 0.8,
        borderColor: '#a3a2a2',
        alignSelf: 'flex-end',
        margin: 10,
        padding: 10
    }
});
