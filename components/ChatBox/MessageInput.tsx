import { HStack } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';

interface Props {
    onSend(text: string): Promise<void>
    onContentSizeChange(e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void
}


export default function MessageInput({
    onSend,
    onContentSizeChange
}: Props) {

    const [value, setValue] = useState<string>('');

    useEffect(() => {

    }, []);

    return (
        <View style={[styles.container]}>
            <TextInput
                placeholder='Type your message'
                multiline
                onChangeText={setValue}
                value={value}
                style={styles.textInput}
                onContentSizeChange={onContentSizeChange}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'baseline',
        flexDirection: "column-reverse",
        height: 50,
        // maxHeight: 350
    },
    textInput: {
        width: '70%',
        margin: 10,
        backgroundColor: 'lightgray',
        borderRadius: 5,
        paddingHorizontal: 10,
        minHeight: 40,
        maxHeight: 100
    },
});
