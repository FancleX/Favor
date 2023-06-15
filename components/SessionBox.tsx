import { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Session from './Session';
import { Message } from '../dev/Dummy';


export default function SessionBox() {

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={Message.sessionHistoryJohn}
                renderItem={({ item }) => <Session {...item} />}
                keyExtractor={(_, index) => `${index}`}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
