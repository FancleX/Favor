import { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Session from './Session';
import { Message } from '../../dev/Dummy';
import { SearchHeader } from '../SearchHeader';


export default function SessionBox() {

    useEffect(() => {

    }, []);

    const searchCallback = async (input: string) => {

    };

    return (
        <View style={styles.container}>
            <SearchHeader
                placeholder='Search a conversation'
                searchCallback={searchCallback}
            />

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
