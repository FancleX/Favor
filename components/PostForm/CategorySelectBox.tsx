import { Text } from 'react-native';
import { CategoryType } from '../Category';

interface Props {
    onSelect(selectedCategory: CategoryType): void
}

export default function CategorySelectBox({ onSelect }: Props) {
    return (
        <Text>CategorySelectBox</Text>
    )
}
