import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';


const filterOptions: string[] = [
    'Latest Post',
    'Highest Paid',
    'Nearest to You'
];

interface Props {
    onSelectedHandler(selectedItem: string, index: number): void;
}

export default function RequestFilter({ onSelectedHandler }: Props) {
    return (
        <SelectDropdown
            data={filterOptions}
            onSelect={onSelectedHandler}
            defaultButtonText={'Select a filter'}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            renderDropdownIcon={(isOpened) =>
            (
                <FontAwesome
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#fff'}
                    size={18}
                />
            )}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.row}
            rowTextStyle={styles.rowtext}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown: {
        backgroundColor: '#444',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    row: {
        backgroundColor: '#444',
        borderBottomColor: '#C5C5C5'
    },
    rowtext: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});
