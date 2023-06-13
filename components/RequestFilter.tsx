import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';

export enum FilterOptions {
    LATEST_POST = 'Latest Post',
    HIGHEST_PAID = 'Highest Paid',
    NEARST_LOCATION = 'Nearest to You'
}

interface Props {
    onSelectedHandler(selectedItem: FilterOptions, index: number): void;
}

export default function RequestFilter({ onSelectedHandler }: Props) {
    return (
        <SelectDropdown
            data={Object.values(FilterOptions)}
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
