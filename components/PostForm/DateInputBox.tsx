import { Text } from 'react-native';
import { FormEntity, FormSubmitData } from './PostForm.d';
import { Dispatch, SetStateAction } from 'react';

interface Props extends FormEntity {
    onVerified: Dispatch<SetStateAction<FormSubmitData>>
}

export default function DateInputBox({
    label,
    isOptional,
    autoSize,
    type,
    onVerified
}: Props) {
    return (
        <Text>DateInputBox</Text>
    )
}
