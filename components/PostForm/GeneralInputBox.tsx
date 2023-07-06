import { Text } from 'react-native';
import { FormEntity } from './PostForm.d';

export default function GeneralInputBox({
    label,
    hideFromUser,
    isOptional,
    autoSize,
    type,
    verification,
    onError
}: FormEntity) {
    return (
        <Text>GeneralInputBox</Text>
    )
}
