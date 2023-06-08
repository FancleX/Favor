import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootstackParamList } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootstackParamList, 'Request'> { }

export default function Request({ route }: Props) {
    const { categoryType } = route.params;

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text>{categoryType}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
