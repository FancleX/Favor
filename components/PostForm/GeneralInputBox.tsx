import { Text, View } from 'react-native';
import { FormEntity, FormSubmitData, FormType } from './PostForm.d';
import { Dispatch, SetStateAction, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const PhoneInputBox: React.FC<{
    label: string,
    autoSize: boolean,
    isOptional: boolean,
    onVerified: Dispatch<SetStateAction<FormSubmitData>>
}> = ({
    label,
    autoSize,
    isOptional,
    onVerified
}) => {

        const [phone, setPhone] = useState<string>('');
        const [status, setStatus] = useState<{ status: 'pass check' | 'error' | 'default', msg: string }>({ status: 'default', msg: '' });

        const phoneVerifier = () => {
            if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)) {
                setStatus({ status: 'pass check', msg: '' });

                onVerified((prevState) => ({
                    ...prevState,
                    poster: {
                        ...prevState.poster,
                        phone: phone
                    },
                }));

                return;
            }

            if (isOptional && phone.length === 0) {
                setStatus({ status: 'default', msg: '' });
                return;
            }

            setStatus({ status: 'error', msg: 'Invalid phone number' });
        };

        return (
            <View>
                <TextInput
                    mode='outlined'
                    label={label}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='Optional phone number'
                    activeOutlineColor='#000'
                    style={{ backgroundColor: '#fff' }}
                    error={status.status === 'error'}
                    textContentType='telephoneNumber'
                    keyboardType='numeric'
                    onBlur={phoneVerifier}
                    multiline={autoSize}
                    contentStyle={{ textAlignVertical: 'center' }}
                    outlineStyle={{ borderRadius: 8 }}
                    right={status.status === 'pass check' &&
                        <TextInput.Icon
                            icon={() =>
                                <Feather
                                    name='check-circle'
                                    size={18}
                                    color='green'
                                />
                            }
                            forceTextInputFocus={false}
                        />}
                />

                {
                    status.status === 'error' && <Text style={{ color: '#cc2a02' }}>{status.msg}</Text>
                }
            </View>
        );
    };


interface Props extends FormEntity {
    onVerified: Dispatch<SetStateAction<FormSubmitData>>
}

export default function GeneralInputBox({
    label,
    isOptional,
    autoSize,
    type,
    onVerified
}: Props) {

    if (type === FormType.Phone) {
        return (
            <PhoneInputBox
                label={label}
                isOptional={isOptional}
                autoSize={autoSize}
                onVerified={onVerified}
            />
        );
    }

    return (
        <Text>abc</Text>
    );
}
