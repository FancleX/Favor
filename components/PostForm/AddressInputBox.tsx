import { Text } from 'react-native';
import { FormEntity } from './PostForm.d';
import { Dispatch, SetStateAction } from 'react';
import { RequestCardData } from '../Request';

interface Props extends FormEntity {
    onVerified: Dispatch<SetStateAction<RequestCardData>>
}

export default function AddressInputBox({
    label,
    isOptional,
    autoSize,
    type,
    onVerified
}: Props) {
    return (
        <Text>AddressInputBox</Text>
    )
}
