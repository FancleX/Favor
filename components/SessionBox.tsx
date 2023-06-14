import { useEffect } from 'react';
import { Divider } from '@rneui/themed';
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
                ItemSeparatorComponent={() => <Divider />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
