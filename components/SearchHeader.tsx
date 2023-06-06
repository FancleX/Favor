import { View, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { useState } from 'react';

export default function SearchHeader() {

    const [search, setSearch] = useState<string>("");

    return (
        <View>
            <SearchBar
                platform='android'
                placeholder='Search a category'
                onChangeText={setSearch}
                value={search}
                containerStyle={styles.searchContainer}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingTop: 25
    }
});
