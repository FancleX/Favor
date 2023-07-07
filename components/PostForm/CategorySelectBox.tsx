import { StyleSheet } from 'react-native';
import { CategoryType } from '../Category';
import { Dispatch, SetStateAction } from 'react';
import { RequestCardData } from '../Request';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
    onSelect: Dispatch<SetStateAction<RequestCardData>>
}

export default function CategorySelectBox({ onSelect }: Props) {

    const onSelectedHandler = (selectedItem: CategoryType) => {
        onSelect((prevState) => ({
            ...prevState,
            category: selectedItem
        }));
    };

    return (
        <SelectDropdown
            data={Object.values(CategoryType)}
            onSelect={onSelectedHandler}
            defaultButtonText={'Choose a Category'}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            renderDropdownIcon={(isOpened) =>
            (
                <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#000'}
                    size={18}
                />
            )}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.row}
            rowTextStyle={styles.rowtext}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 55,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: 'grey',
        borderWidth: 1
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    row: {
        backgroundColor: '#fff',
        borderBottomColor: 'grey',
    },
    rowtext: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
