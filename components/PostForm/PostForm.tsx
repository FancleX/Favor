import { View } from 'react-native';
import { FormEntity, FormType } from './PostForm.d';
import { FlatList } from 'react-native-gesture-handler';
import { RequestCardData } from '../Request';
import { useCallback } from 'react';
import GeneralInputBox from './GeneralInputBox';
import AddressInputBox from './AddressInputBox';
import DateInputBox from './DateInputBox';
import CategorySelectBox from './CategorySelectBox';

const forms: FormEntity[] = [];

export default function PostForm() {

    const renderItem = useCallback((item: FormEntity) => {
        switch (item.type) {
            case FormType.Normal:
            case FormType.Email:
            case FormType.Password:
            case FormType.Currency:
            case FormType.Phone:
                return <GeneralInputBox {...item} />;
            case FormType.Address:
                return <AddressInputBox {...item} />
            case FormType.Date:
                return <DateInputBox {...item} />
            case FormType.CategorySelect:
                return <CategorySelectBox onSelect={() => { }} />
            default:
                throw new Error('Unkown form type');
        }
    }, [forms]);

    return (
        <View>
            <FlatList
                data={forms}
                renderItem={({ item }) => (
                    <View>
                        {renderItem(item)}
                    </View>
                )}
            />
        </View>
    )
}
