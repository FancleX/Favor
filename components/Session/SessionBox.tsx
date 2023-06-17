import { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Session from './Session';
import { Message } from '../../dev/Dummy';
import { SearchBar } from '../SearchBar';


export default function SessionBox() {

    useEffect(() => {

    }, []);

    const onSearch = async (input: string) => {

    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder='Search a conversation'
                onSearch={onSearch}
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
