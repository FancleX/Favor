import { View, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

interface Props {
    placeholder: string,
    onSearch(input: string): Promise<void>
}

export default function SearchBar({ placeholder, onSearch }: Props) {

    const [textInput, setTextInput] = useState<string>("");
    const router = useNavigation();

    const doSearch = async () => {
        if (textInput.trim().length > 0) {
            console.log(textInput);
            Keyboard.dismiss();

            await onSearch(textInput);
        }
    }

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => {
                Keyboard.dismiss();
                router.dispatch(DrawerActions.toggleDrawer());
            }}>
                <Ionicons name="md-menu" size={25} color="black" />
            </TouchableOpacity>

            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBarTextInput}
                    placeholder={placeholder}
                    autoCorrect={true}
                    inlineImageLeft='search_icon'
                    onChangeText={setTextInput}
                    value={textInput}
                />

                <TouchableOpacity
                    style={styles.searchBarInnerIcon}
                    onPress={() => setTextInput("")}
                >
                    <Feather name='delete' size={18} color='black' />
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity
                    onPress={doSearch}
                >
                    <Ionicons name='md-search-circle' size={27} color='black' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 80,
        paddingTop: 20,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    searchBarContainer: {
        flex: 0.8,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        paddingHorizontal: 10
    },
    searchBarTextInput: {
        flex: 1
    },
    searchBarInnerIcon: {
        paddingVertical: 5
    }
});
